import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  // If no source is provided, return a mock builder to prevent chain crashes
  if (!source) {
    return {
      width: () => ({
        height: () => ({
          url: () => ''
        })
      })
    };
  }

  // If it's a fallback image object, return a mock builder returning the fallback URL
  if (source.fallbackUrl || (source.asset && !source.asset._ref) || typeof source.asset === 'undefined') {
    const url = source.fallbackUrl || '';
    return {
      width: () => ({
        height: () => ({
          url: () => url
        })
      })
    };
  }

  try {
    return builder.image(source);
  } catch (error) {
    const url = source.fallbackUrl || '';
    return {
      width: () => ({
        height: () => ({
          url: () => url
        })
      })
    };
  }
}
