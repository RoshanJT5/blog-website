'use client';

import { useState } from 'react';

// Accordion-style FAQ using only existing CSS variables — no new styles needed
export default function FaqSection({ section }) {
  const { heading, items = [] } = section;
  const [openIndex, setOpenIndex] = useState(null);

  if (!items.length) return null;

  return (
    <div className="wrap" style={{ margin: '80px auto' }}>
      {heading && (
        <div className="section-head fade-up" style={{ marginBottom: '32px' }}>
          <div><h2>{heading}</h2></div>
        </div>
      )}

      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item._key || i}
              style={{
                borderBottom: '1px solid #e5e0d8',
                padding: '0',
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--dark)',
                }}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    flexShrink: 0,
                    color: 'var(--accent)',
                    transition: 'transform 0.25s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <p
                  style={{
                    padding: '0 0 20px',
                    color: '#5a5750',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
