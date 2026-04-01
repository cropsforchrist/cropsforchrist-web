'use client';

import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId: number;

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      a: Math.random() * 0.5 + 0.1,
      c: Math.random() > 0.6 ? '#D4A843' : Math.random() > 0.5 ? '#6A9A30' : '#ffffff',
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.c;
        ctx.globalAlpha = s.a;
        ctx.fill();
        s.x = (s.x + s.vx + W) % W;
        s.y = (s.y + s.vy + H) % H;
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 120% 80% at 50% 110%, #1a0c03 0%, #0a0602 70%)',
        }}
      />
      <div style={{
        position: 'fixed', bottom: 0, left: '-5%', right: '-5%',
        height: '30vh', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, #0a0602 0%, #1a0c03 40%, transparent 100%)',
        clipPath: 'polygon(0 60%, 8% 40%, 18% 55%, 28% 38%, 40% 52%, 52% 35%, 62% 50%, 74% 33%, 85% 48%, 95% 30%, 100% 45%, 100% 100%, 0 100%)',
      }} />
    </>
  );
}