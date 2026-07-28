'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formMsg, setFormMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMsg('Thanks! We’ll be in touch soon.');
    e.target.reset();
    setTimeout(() => {
      setFormMsg('');
    }, 4000);
  };

  return (
    <>
      <section className="page-hero">
        <span className="hero-tag">Get In Touch</span>
        <h1>We'd love to hear from you</h1>
        <p>Pitches, partnerships, corrections, or just want to say hi — drop us a line below.</p>
      </section>

      <div className="wrap">
        <div className="contact-wrap">
          <div className="contact-info">
            <h2>Let's talk</h2>
            <p>
              Whether you're pitching a story, reporting a broken link, or want to collaborate on something bigger — we read every message ourselves.
            </p>

            <div className="info-item">
              <div className="info-icon">✉</div>
              <div>
                <b>Email</b>
                <span>hello@wanderwayfare.com</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">☎</div>
              <div>
                <b>Phone</b>
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <b>Studio</b>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>

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
            <button type="submit" className="submit-btn">
              Send Message
            </button>
            <div className="form-msg">{formMsg}</div>
          </form>
        </div>
      </div>
    </>
  );
}
