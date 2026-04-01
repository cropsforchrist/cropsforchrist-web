import { SITE_VERSION_LABEL } from '@/src/lib/version';

export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: '0.75rem',
      right: '1rem',
      fontSize: '0.65rem',
      fontWeight: 600,
      letterSpacing: '0.12em',
      color: 'rgba(212,168,67,0.3)',
      zIndex: 999,
      pointerEvents: 'none',
    }}>
      ✝ Crops for Christ {SITE_VERSION_LABEL}
    </footer>
  );
}