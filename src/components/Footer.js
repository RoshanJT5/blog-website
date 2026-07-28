'use client';

import Link from 'next/link';

export default function Footer() {
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const msgEl = form.nextElementSibling;
    if (msgEl) {
      msgEl.textContent = 'Thanks! We’ll be in touch soon.';
      form.reset();
      setTimeout(() => {
        msgEl.textContent = '';
      }, 4000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo">
            Wander<span>&</span>Wayfare
          </Link>
          <p>
            Stories, guides and honest advice for people who'd rather be somewhere else. 
            Independently written, always ad-free of nonsense.
          </p>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li>
              <Link href="/about">Our Story</Link>
            </li>
            <li>
              <Link href="/about">The Team</Link>
            </li>
            <li>
              <Link href="/blog">All Articles</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/contact">FAQs</Link>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-news">
          <h4>Stay in the loop</h4>
          <p>Weekly travel notes, straight to your inbox.</p>
          <form className="footer-news-form" onSubmit={handleDemoSubmit}>
            <input type="email" placeholder="Email address" required />
            <button type="submit">Join</button>
          </form>
          <div className="form-msg"></div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Wander & Wayfare. All rights reserved.</span>
        <div className="social-icons">
          <a href="#" aria-label="Instagram">
            IG
          </a>
          <a href="#" aria-label="Twitter">
            X
          </a>
          <a href="#" aria-label="Pinterest">
            P
          </a>
        </div>
        <div className="legal-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
