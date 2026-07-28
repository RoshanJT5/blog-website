'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/image';

export default function HeroSlider({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressRef = useRef([]);

  const SLIDE_DURATION = 10000; // 10 seconds per slide

  useEffect(() => {
    if (slides.length === 0) return;

    // Reset progress bar styling on change
    progressRef.current.forEach((bar, idx) => {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });

    // Start progress bar transition for current slide
    const currentBar = progressRef.current[currentIndex];
    if (currentBar) {
      // Force repaint to make sure transition resets
      void currentBar.offsetWidth;
      currentBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
      currentBar.style.width = '100%';
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);

  if (slides.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleIndicatorClick = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.fallbackUrl) return image.fallbackUrl;
    try {
      return urlFor(image).width(1600).height(900).url();
    } catch (e) {
      return image.fallbackUrl || '';
    }
  };

  return (
    <section className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide._id || index}
              className={`slide ${isActive ? 'active' : ''}`}
            >
              {slide.image && (
                <img
                  className="hero-img"
                  src={getImageUrl(slide.image)}
                  alt={slide.title}
                />
              )}
              <div className="hero-content">
                <div className="hero-text">
                  <span className="hero-tag">{slide.tag || 'Featured Story'}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  
                  {slide.linkedPost?.slug ? (
                    <Link
                      href={`/blog/${slide.linkedPost.slug}`}
                      className="btn-signup hero-cta-btn"
                      style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      {slide.buttonText || 'Read Full Story'} &rarr;
                    </Link>
                  ) : (
                    <button
                      className="btn-signup hero-cta-btn"
                      style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      {slide.buttonText || 'Read Full Story'} &rarr;
                    </button>
                  )}
                </div>
                
                <div className="hero-author">
                  <div className="avatar">
                    {slide.linkedPost?.authorInitials || 'JD'}
                  </div>
                  <div className="meta">
                    <b>{slide.linkedPost?.authorName || 'Jane Doe'}</b>
                    {slide.linkedPost?.readTime || '7 min read'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous slide">
        &larr;
      </button>
      <button className="slider-arrow next" onClick={handleNext} aria-label="Next slide">
        &rarr;
      </button>

      {/* Progress Indicators */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => handleIndicatorClick(e, index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className="progress-bar"
              ref={(el) => (progressRef.current[index] = el)}
            ></span>
          </button>
        ))}
      </div>
    </section>
  );
}
