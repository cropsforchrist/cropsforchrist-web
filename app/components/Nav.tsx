'use client';

interface Props {
  onHome: () => void;
  onBack: () => void;
}

export default function Nav({ onHome, onBack }: Props) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '1rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'linear-gradient(to bottom, rgba(10,6,2,0.85) 0%, transparent 100%)',
    }}>
      <span
        onClick={onHome}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1rem', fontWeight: 700,
          color: 'var(--gold)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}
      >
        ✝ Crops for Christ
      </span>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: '1px solid rgba(212,168,67,0.4)',
          color: 'var(--wheat)',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.75rem', fontWeight: 600,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          cursor: 'pointer', padding: '0.4rem 1rem',
          transition: 'all 0.25s',
        }}
      >
        ← Choose Another Path
      </button>
    </nav>
  );
}