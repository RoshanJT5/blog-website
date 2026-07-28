import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FALLBACK_BLOG_DATABASE } from '../src/sanity/fallbackData.js';

// Resolve directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_READ_TOKEN;

if (!token) {
  console.error("❌ Error: No token found in .env.local!");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: token
});

// Helper to convert HTML content into Sanity Block Content objects
function htmlToBlocks(html) {
  const blocks = [];
  
  // Extract paragraphs, headings, blockquotes, and list items using regex splits
  const tokens = html.split(/(<\/?[a-zA-Z0-9]+>)/g).map(t => t.trim()).filter(Boolean);
  
  let currentStyle = 'normal';
  let inList = false;
  let listType = 'bullet';

  tokens.forEach(tok => {
    if (tok.startsWith('<h4')) {
      currentStyle = 'h4';
      return;
    }
    if (tok.startsWith('</h4')) {
      currentStyle = 'normal';
      return;
    }
    if (tok.startsWith('<blockquote')) {
      currentStyle = 'blockquote';
      return;
    }
    if (tok.startsWith('</blockquote')) {
      currentStyle = 'normal';
      return;
    }
    if (tok.startsWith('<ul')) {
      inList = true;
      listType = 'bullet';
      return;
    }
    if (tok.startsWith('</ul') || tok.startsWith('</ol')) {
      inList = false;
      return;
    }
    if (tok.startsWith('<ol')) {
      inList = true;
      listType = 'number';
      return;
    }
    if (tok.startsWith('<li') || tok.startsWith('</li') || tok.startsWith('<p') || tok.startsWith('</p')) {
      // structural markup tags, skip text conversion
      return;
    }

    // Clean quotes or escape entities
    let cleanedText = tok.replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&bull;/g, '•');

    const block = {
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 9),
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(2, 9),
          text: cleanedText,
          marks: []
        }
      ]
    };

    if (inList) {
      block.listItem = listType;
      block.level = 1;
    } else {
      block.style = currentStyle;
    }

    blocks.push(block);
  });

  return blocks;
}

async function run() {
  console.log("🚀 Initializing fallback data upload to Sanity project ID:", projectId);
  const posts = Object.entries(FALLBACK_BLOG_DATABASE);
  
  for (const [slug, data] of posts) {
    console.log(`➡️ Processing: ${data.title}...`);
    
    // We will create mock assets (sanity.imageAsset) to represent the unsplash images in Sanity
    // However, since downloading images and creating real asset documents requires write requests,
    // we can create a simpler placeholder reference, or try to push the imageUrl as a meta field if the schema supported it.
    // In our case, the schema requires a real "image" field. Let's create a placeholder asset document to satisfy the type:
    let assetRef = null;
    
    try {
      // To satisfy the required cover image validation without failing on empty references, 
      // we can try uploading the unsplash image stream to Sanity's media endpoint!
      console.log(`📥 Downloading image for: ${slug}...`);
      const response = await fetch(data.imageUrl);
      const buffer = await response.arrayBuffer();
      
      const asset = await client.assets.upload('image', Buffer.from(buffer), {
        filename: `${slug}.jpg`
      });
      
      assetRef = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      };
      console.log(`✅ Uploaded image asset: ${asset._id}`);
    } catch (err) {
      console.warn(`⚠️ Warning: Failed to upload image asset for ${slug}, creating text draft only:`, err.message);
    }
    
    const doc = {
      _type: 'blogPost',
      _id: `fallback-${slug}`,
      title: data.title,
      slug: {
        _type: 'slug',
        current: slug
      },
      category: data.category.toLowerCase().replace('featured story', 'lifestyle'), // Align with schema listing option
      date: data.date,
      readTime: data.readTime,
      authorName: data.authorName,
      authorInitials: data.authorInitials,
      snippet: data.snippet,
      content: htmlToBlocks(data.content),
      image: assetRef,
      isFeatured: data.category === 'Featured Story'
    };
    
    try {
      await client.createOrReplace(doc);
      console.log(`🎉 Successfully published to Sanity: "${data.title}"`);
    } catch (e) {
      console.error(`❌ Failed to publish ${slug}:`, e.message);
    }
  }
  console.log("✨ Data import operation completed!");
}

run();
