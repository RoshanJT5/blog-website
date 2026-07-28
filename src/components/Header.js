'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="logo">
            Wander<span>&</span>Wayfare
          </Link>
          
          <nav className="main-nav">
            <Link href="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
            <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>
              Blogs
            </Link>
            <Link href="/about" className={isActive('/about') ? 'active' : ''}>
              About Us
            </Link>
            <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>
              Contact
            </Link>
          </nav>

          <div className="header-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search destinations..." />
          </div>

          <div className="header-right">
            <select className="lang-select">
              <option>EN</option>
              <option>FR</option>
              <option>ES</option>
            </select>
            <Link href="/contact" className="btn-signup">
              Sign Up
            </Link>
            <button 
              className="nav-toggle" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="close-btn" 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className={pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={pathname.startsWith('/blog') ? 'active' : ''}>
          Blogs
        </Link>
        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={pathname.startsWith('/about') ? 'active' : ''}>
          About Us
        </Link>
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={pathname.startsWith('/contact') ? 'active' : ''}>
          Contact
        </Link>
      </div>
    </>
  );
}
