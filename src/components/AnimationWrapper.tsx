'use client';

import { useEffect } from 'react';
import { initAllAnimations } from '@/lib/animations';

export default function AnimationWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAllAnimations();
  }, []);

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar"></div>
      </div>
      {children}
    </>
  );
}