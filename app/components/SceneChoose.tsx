'use client';

interface Props {
  onDonor: () => void;
  onNeed: () => void;
  onGospel: () => void;
}

export default function SceneChoose({ onDonor, onNeed, onGospel }: Props) {
  return (
    <section className="scene">
      <div className="choose-wrap">
        <h2 className="choose-q">What brings you here today?</h2>
        <p className="choose-hint">If you need it take it. If you have it give it. If you know someone who needs it, take some more.</p>
        <p className="choose-sub">Every path leads somewhere beautiful — choose where to begin</p>        <div className="paths">

          <div className="path-card donor" onClick={onDonor}>
            <div className="path-icon-wrap">💛</div>
            <div className="path-sublabel">I want to give</div>
            <div className="path-label">I Want to Help</div>
            <p className="path-desc">I have something to offer — time, produce, resources, or a willing heart.</p>
          </div>

          <div className="path-card need" onClick={onNeed}>
            <div className="path-icon-wrap">🌿</div>
            <div className="path-sublabel">I need support</div>
            <div className="path-label">I Need Food</div>
            <p className="path-desc">I or someone I know is struggling. I'm looking for fresh food and community — without judgment.</p>
          </div>

          <div className="path-card gospel" onClick={onGospel}>
            <div className="path-icon-wrap">✝</div>
            <div className="path-sublabel">I'm searching</div>
            <div className="path-label">I'm Looking for More</div>
            <p className="path-desc">Something led me here. There's a hunger inside me that food can't fill.</p>
          </div>

        </div>
      </div>
    </section>
  );
}