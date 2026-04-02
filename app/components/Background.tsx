'use client';

import { useEffect, useRef, useState } from 'react';

type Season = 'spring' | 'summer' | 'fall' | 'winter';
type TimeOfDay = 'day' | 'night';

function getSeasonFromDate(): Season {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const md = m * 100 + d;
  if (md >= 321 && md <= 620) return 'spring';
  if (md >= 621 && md <= 920) return 'summer';
  if (md >= 921 && md <= 1220) return 'fall';
  return 'winter';
}

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  return h >= 6 && h < 20 ? 'day' : 'night';
}

function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m2 = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m2 + 114) / 31);
  const day = ((h + l - 7 * m2 + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function isEasterWeekend(): boolean {
  const now = new Date();
  const easter = getEaster(now.getFullYear());
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const gf = new Date(goodFriday.getFullYear(), goodFriday.getMonth(), goodFriday.getDate());
  const es = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());
  return today >= gf && today <= es;
}

const SEASON_COLORS = {
  spring: {
    day:   { sky1: '#87CEEB', sky2: '#c8f0a0' },
    night: { sky1: '#1a3a2a', sky2: '#0d2a1a' },
    field: '#2d5a1b',
  },
  summer: {
    day:   { sky1: '#1a6fe8', sky2: '#f0c040' },
    night: { sky1: '#0a1a3a', sky2: '#050d20' },
    field: '#1a3a05',
  },
  fall: {
    day:   { sky1: '#e87020', sky2: '#f0a030' },
    night: { sky1: '#3a1a05', sky2: '#200d02' },
    field: '#5a2a05',
  },
  winter: {
    day:   { sky1: '#b0cce8', sky2: '#ddeeff' },
    night: { sky1: '#0a1525', sky2: '#050d18' },
    field: '#1a2535',
  },
};

type Star = {
  x: number; y: number; r: number;
  vx: number; vy: number;
  a: number; baseA: number;
  twinkleSpeed: number; twinklePhase: number;
  c: string;
};

type ShootingStar = {
  x: number; y: number; vx: number; vy: number;
  len: number; a: number; active: boolean; timer: number;
};

type FireworkParticle = {
  x: number; y: number; vx: number; vy: number;
  a: number; color: string; size: number;
};

type Firework = {
  x: number; y: number;
  targetY: number; vy: number;
  phase: 'rocket' | 'burst';
  particles: FireworkParticle[];
  color: string; timer: number;
  trailX: number[]; trailY: number[];
};

type Particle = {
  x: number; y: number; vx: number; vy: number;
  size: number; a: number; color: string;
  wobble: number; wobbleSpeed: number; rotation: number;
};

type EasterEgg = {
  x: number; y: number;
  width: number; height: number;
  colors: string[];
  pattern: 'stripes' | 'dots' | 'zigzag';
  wobble: number; wobbleSpeed: number;
};

const FIREWORK_COLORS = ['#ff2222', '#22ff22', '#2266ff', '#ffffff', '#ffee00'];

const EGG_COLOR_SETS = [
  ['#ff6eb4', '#ffef9f', '#ffffff'],
  ['#a78bfa', '#fcd34d', '#f9a8d4'],
  ['#34d399', '#60a5fa', '#ffffff'],
  ['#f87171', '#fbbf24', '#a3e635'],
  ['#e879f9', '#38bdf8', '#ffffff'],
  ['#fb923c', '#facc15', '#4ade80'],
];

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [season, setSeason] = useState<Season>(getSeasonFromDate());
  const [time, setTime] = useState<TimeOfDay>(getTimeOfDay());
  const [showEggs] = useState<boolean>(isEasterWeekend());
  const [devEaster, setDevEaster] = useState(false);

  const seasonRef = useRef(season);
  const timeRef = useRef(time);
  const devEasterRef = useRef(devEaster);
  useEffect(() => { seasonRef.current = season; }, [season]);
  useEffect(() => { timeRef.current = time; }, [time]);
  useEffect(() => { devEasterRef.current = devEaster; }, [devEaster]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId: number;

    function fieldY(x: number): number {
      const t = x / W;
      if (t < 0.1)  return H * 0.72 + (H * 0.58 - H * 0.72) * (t / 0.1);
      if (t < 0.28) return H * 0.58 + (H * 0.62 - H * 0.58) * ((t - 0.1) / 0.18);
      if (t < 0.44) return H * 0.62 + (H * 0.65 - H * 0.62) * ((t - 0.28) / 0.16);
      if (t < 0.52) return H * 0.65 + (H * 0.6  - H * 0.65) * ((t - 0.44) / 0.08);
      if (t < 0.7)  return H * 0.6  + (H * 0.63 - H * 0.6)  * ((t - 0.52) / 0.18);
      if (t < 0.78) return H * 0.63 + (H * 0.57 - H * 0.63) * ((t - 0.7)  / 0.08);
      if (t < 0.93) return H * 0.57 + (H * 0.6  - H * 0.57) * ((t - 0.78) / 0.15);
      return H * 0.6 + (H * 0.65 - H * 0.6) * ((t - 0.93) / 0.07);
    }

    const eggs: EasterEgg[] = Array.from({ length: 10 }, (_, i) => {
      const x = (W / 11) * (i + 1) + (Math.random() - 0.5) * 40;
      const patterns: EasterEgg['pattern'][] = ['stripes', 'dots', 'zigzag'];
      const h = Math.random() * 16 + 14;
      const w = h * 0.7;
      // Sample the bezier field height at this x position
      const fy = fieldY(x);
      return {
        x,
        y: fy + h * 8.0,
        width: w, height: h,
        colors: EGG_COLOR_SETS[Math.floor(Math.random() * EGG_COLOR_SETS.length)],
        pattern: patterns[Math.floor(Math.random() * patterns.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      };
    });

    function drawEgg(egg: EasterEgg) {
      egg.wobble += egg.wobbleSpeed;
      const wobbleX = Math.sin(egg.wobble) * 1.5;

      ctx.save();
      ctx.translate(egg.x + wobbleX, egg.y);
      ctx.beginPath();
      ctx.ellipse(0, 0, egg.width / 2, egg.height / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = egg.colors[0];
      ctx.fill();
      ctx.clip();

      if (egg.pattern === 'stripes') {
        const stripeH = egg.height / 4;
        [-2, -1, 0, 1, 2].forEach(i => {
          ctx.fillStyle = i % 2 === 0 ? egg.colors[1] : egg.colors[2];
          ctx.fillRect(-egg.width, i * stripeH, egg.width * 2, stripeH);
        });
      } else if (egg.pattern === 'dots') {
        for (let dx = -egg.width; dx < egg.width; dx += 7) {
          for (let dy = -egg.height; dy < egg.height; dy += 7) {
            ctx.beginPath();
            ctx.arc(dx, dy, 2, 0, Math.PI * 2);
            ctx.fillStyle = egg.colors[1];
            ctx.fill();
          }
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(-egg.width, -egg.height / 2);
        for (let x = -egg.width; x < egg.width; x += 6) {
          ctx.lineTo(x + 3, 0);
          ctx.lineTo(x + 6, -egg.height / 2);
        }
        ctx.lineTo(egg.width, egg.height);
        ctx.lineTo(-egg.width, egg.height);
        ctx.closePath();
        ctx.fillStyle = egg.colors[2];
        ctx.fill();
      }

      ctx.restore();
      ctx.save();
      ctx.translate(egg.x + wobbleX, egg.y);
      ctx.beginPath();
      ctx.ellipse(0, 0, egg.width / 2, egg.height / 2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    const stars: Star[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.5 + 0.3,
      baseA: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.05 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      c: Math.random() > 0.7 ? '#D4A843' : Math.random() > 0.5 ? '#aed6f1' : '#ffffff',
    }));

    const shootingStars: ShootingStar[] = [makeShootingStar(true)];

    function makeShootingStar(inactive: boolean): ShootingStar {
      return {
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.4,
        vx: Math.random() * 8 + 4,
        vy: Math.random() * 4 + 2,
        len: Math.random() * 80 + 40,
        a: 0, active: !inactive,
        timer: Math.random() * 400 + 100,
      };
    }

    const fireworks: Firework[] = [];
    let fireworkTimer = Math.random() * 200 + 150;

    function launchFirework() {
      const x = Math.random() * W * 0.6 + W * 0.2;
      const targetY = Math.random() * H * 0.35 + H * 0.05;
      const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      fireworks.push({
        x, y: H * 0.9, targetY,
        vy: -(Math.abs(H * 0.9 - targetY)) / 35,
        phase: 'rocket', particles: [],
        color, timer: 80,
        trailX: [], trailY: [],
      });
    }

    function burstFirework(fw: Firework) {
      fw.phase = 'burst';
      fw.particles = Array.from({ length: 55 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        return {
          x: fw.x, y: fw.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          a: 1, color: fw.color,
          size: Math.random() * 2.5 + 1,
        };
      });
    }

    function drawFireworks() {
      fireworkTimer--;
      if (fireworkTimer <= 0) {
        launchFirework();
        fireworkTimer = Math.random() * 250 + 180;
      }
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        if (fw.phase === 'rocket') {
          fw.trailX.push(fw.x);
          fw.trailY.push(fw.y);
          if (fw.trailX.length > 12) { fw.trailX.shift(); fw.trailY.shift(); }
          fw.trailX.forEach((tx, ti) => {
            const ta = (ti / fw.trailX.length) * 0.8;
            ctx.beginPath();
            ctx.arc(tx, fw.trailY[ti], 2, 0, Math.PI * 2);
            ctx.fillStyle = fw.color;
            ctx.globalAlpha = ta;
            ctx.fill();
          });
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 1;
          ctx.fill();
          fw.y += fw.vy;
          if (fw.y <= fw.targetY) burstFirework(fw);
        } else {
          fw.timer--;
          let allFaded = true;
          fw.particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            p.vy += 0.07; p.vx *= 0.97;
            p.a -= 0.018;
            if (p.a > 0) {
              allFaded = false;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = Math.max(0, p.a);
              ctx.fill();
            }
          });
          if (allFaded || fw.timer <= 0) fireworks.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => makeParticle('init'));

    function shouldShowParticles(): boolean {
      const s = seasonRef.current;
      const t = timeRef.current;
      if (t === 'night') return false;
      return s === 'fall' || s === 'winter';
    }

    function makeParticle(mode: 'init' | 'top'): Particle {
      const s = seasonRef.current;
      return {
        x: Math.random() * W,
        y: mode === 'init' ? Math.random() * H : -20,
        vx: s === 'fall' ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 0.5,
        vy: s === 'winter' ? Math.random() * 1 + 0.3 : Math.random() * 1.2 + 0.4,
        size: s === 'winter' ? Math.random() * 4 + 2 : Math.random() * 10 + 6,
        a: Math.random() * 0.6 + 0.3,
        color: s === 'fall'
          ? ['#ff6600','#cc3300','#ff9900','#ffcc00','#993300'][Math.floor(Math.random() * 5)]
          : '#ffffff',
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        rotation: Math.random() * Math.PI * 2,
      };
    }

    function drawParticle(p: Particle, s: Season) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      if (s === 'winter') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI) / 3);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, p.size);
          ctx.stroke();
          ctx.restore();
        }
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawShootingStars() {
      shootingStars.forEach((ss, i) => {
        ss.timer--;
        if (ss.timer <= 0 && !ss.active) {
          shootingStars[i] = { ...makeShootingStar(false), active: true, a: 0 };
          return;
        }
        if (!ss.active) return;
        ss.x += ss.vx; ss.y += ss.vy;
        ss.a = Math.min(ss.a + 0.05, 0.8);
        if (ss.x > W || ss.y > H) {
          shootingStars[i] = makeShootingStar(true);
          shootingStars[i].timer = Math.random() * 300 + 150;
          return;
        }
        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.len, ss.y - ss.len * (ss.vy / ss.vx)
        );
        grad.addColorStop(0, `rgba(255,255,255,${ss.a})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * (ss.vy / ss.vx));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    function draw() {
      const s = seasonRef.current;
      const t = timeRef.current;
      const skyColors = SEASON_COLORS[s][t];

      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, skyColors.sky2);
      grad.addColorStop(1, skyColors.sky1);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      if (t === 'night') {
        stars.forEach(star => {
          star.twinklePhase += star.twinkleSpeed;
          star.a = Math.max(0, Math.min(1, star.baseA + Math.sin(star.twinklePhase) * 0.3));
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = star.c;
          ctx.globalAlpha = star.a;
          ctx.fill();
          star.x = (star.x + star.vx + W) % W;
          star.y = (star.y + star.vy + H) % H;
        });
        ctx.globalAlpha = 1;
        drawShootingStars();
        ctx.globalAlpha = 1;
        if (s === 'summer') drawFireworks();
      }

      if (shouldShowParticles()) {
        particles.forEach((p, i) => {
          p.wobble += p.wobbleSpeed;
          p.x += p.vx + Math.sin(p.wobble) * 0.5;
          p.y += p.vy;
          p.rotation += 0.01;
          if (p.y > H + 20 || p.x < -30 || p.x > W + 30) {
            particles[i] = makeParticle('top');
          }
          drawParticle(p, s);
        });
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = SEASON_COLORS[s].field;
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, H * 0.72);
      ctx.bezierCurveTo(W * 0.1, H * 0.58, W * 0.2, H * 0.68, W * 0.28, H * 0.62);
      ctx.bezierCurveTo(W * 0.36, H * 0.55, W * 0.44, H * 0.65, W * 0.52, H * 0.6);
      ctx.bezierCurveTo(W * 0.6, H * 0.53, W * 0.7, H * 0.63, W * 0.78, H * 0.57);
      ctx.bezierCurveTo(W * 0.86, H * 0.5, W * 0.93, H * 0.6, W, H * 0.65);
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();

      if ((showEggs || devEasterRef.current) && s === 'spring' && t === 'day') {
        eggs.forEach(egg => drawEgg(egg));
      }

      animId = requestAnimationFrame(draw);
    }

    function resize() {
      if (!canvas) return;
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [showEggs]);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{
        position: 'fixed', bottom: '2.5rem', left: '1rem', zIndex: 1000,
        display: 'flex', gap: '0.4rem', flexWrap: 'wrap', maxWidth: '280px',
      }}>
        {(['spring','summer','fall','winter'] as Season[]).map(s => (
          <button key={s} onClick={() => setSeason(s)} style={{
            padding: '0.3rem 0.6rem', fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
            background: season === s ? 'rgba(240,192,64,0.3)' : 'rgba(0,0,0,0.5)',
            border: season === s ? '1px solid #F0C040' : '1px solid rgba(255,255,255,0.2)',
            color: season === s ? '#F0C040' : 'rgba(255,255,255,0.5)',
          }}>{s}</button>
        ))}
        <button onClick={() => setTime(t => t === 'day' ? 'night' : 'day')} style={{
          padding: '0.3rem 0.6rem', fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.5)',
        }}>{time === 'day' ? '🌙 Night' : '☀️ Day'}</button>
        <button onClick={() => setDevEaster(e => !e)} style={{
          padding: '0.3rem 0.6rem', fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
          background: devEaster ? 'rgba(255,110,180,0.3)' : 'rgba(0,0,0,0.5)',
          border: devEaster ? '1px solid #ff6eb4' : '1px solid rgba(255,255,255,0.2)',
          color: devEaster ? '#ff6eb4' : 'rgba(255,255,255,0.5)',
        }}>🥚 Easter</button>
      </div>
    </>
  );
}