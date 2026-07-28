'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function InteractiveEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Magnetic buttons
    const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-signup');
    
    const mouseMoveHandlers = [];
    const mouseLeaveHandlers = [];

    magneticBtns.forEach((btn, index) => {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
      };

      const handleMouseLeave = () => {
        btn.style.transform = 'translate(0,0)';
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      // Store references to clean up
      mouseMoveHandlers.push({ btn, handler: handleMouseMove });
      mouseLeaveHandlers.push({ btn, handler: handleMouseLeave });
    });

    // 2. Parallax CTA text
    const parallaxText = document.querySelector('.promo-coast-text');
    let handleScroll = null;

    if (parallaxText) {
      handleScroll = () => {
        const promoCoast = parallaxText.closest('.promo-coast');
        if (!promoCoast) return;
        const rect = promoCoast.getBoundingClientRect();
        const offset = rect.top * 0.06;
        parallaxText.style.transform = `translateY(${offset}px)`;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      // Clean up event listeners
      mouseMoveHandlers.forEach(({ btn, handler }) => btn.removeEventListener('mousemove', handler));
      mouseLeaveHandlers.forEach(({ btn, handler }) => btn.removeEventListener('mouseleave', handler));
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  return null;
}
