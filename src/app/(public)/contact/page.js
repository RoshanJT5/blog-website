'use client';

import { useState, useEffect } from 'react';

// Contact page reads from Sanity contactPage document.
// Because the contact form needs client interactivity, this is a client component.
// Sanity data is fetched client-side on mount with a fallback to hardcoded content.

const FALLBACK = {
  heroTag: 'Get In Touch',
  heroHeading: "We'd love to hear from you",
  heroDescription: 'Pitches, partnerships, corrections, or just want to say hi — drop us a line below.',
  contactPanelHeading: "Let's talk",
  contactPanelIntro: "Whether you're pitching a story, reporting a broken link, or want to collaborate on something bigger — we read every message ourselves.",
  email: 'hello@wanderwayfare.com',
  phone: '+91 98765 43210',
  address: 'Ahmedabad, Gujarat, India',
  businessHours: null,
};

export default function ContactPage() {
  const [page,    setPage]    = useState(FALLBACK);
  const [formMsg, setFormMsg] = useState('');

  useEffect(() => {
    // Fetch contactPage data from our own API proxy to avoid exposing the token client-side
    fetch('/api/page-data/contact')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setPage({ ...FALLBACK, ...data }); })
      .catch(() => { /* silently use fallback */ });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMsg("Thanks! We'll be in touch soon.");
    e.target.reset();
    setTimeout(() => setFormMsg(''), 4000);
  };

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <span className="hero-tag">{page.heroTag}</span>
        <h1>{page.heroHeading}</h1>
        <p>{page.heroDescription}</p>
      </section>

      <div className="wrap">
        <div className="contact-wrap">
          {/* ── Contact Info Panel ──────────────────────────────────────── */}
          <div className="contact-info">
            <h2>{page.contactPanelHeading}</h2>
            <p>{page.contactPanelIntro}</p>

            <div className="info-item">
              <div className="info-icon">✉</div>
              <div>
                <b>Email</b>
                <span>{page.email}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">☎</div>
              <div>
                <b>Phone</b>
                <span>{page.phone}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <b>Studio</b>
                <span>{page.address}</span>
              </div>
            </div>

            {page.businessHours && (
              <div className="info-item">
                <div className="info-icon">🕐</div>
                <div>
                  <b>Hours</b>
                  <span>{page.businessHours}</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Contact Form (frontend only — no Sanity storage) ─────────── */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="What's this about?" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Tell us more..." required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
            <div className="form-msg">{formMsg}</div>
          </form>
        </div>
      </div>
    </>
  );
}
