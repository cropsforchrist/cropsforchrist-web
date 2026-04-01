'use client';

interface Props {
  onGospel: () => void;
  onBack: () => void;
}

export default function SceneGiveProduce({ onGospel, onBack }: Props) {
  return (
    <section className="scene scroll">
      <div className="inner">
        <div className="badge amber">🥕 Produce Donations</div>
        <h1 className="scene-h1">From Your<br /><em>Garden</em> to Their Table</h1>
        <p className="body-text">
          If you have a backyard garden, a small farm, or surplus produce, Crops for Christ will make sure
          it reaches a family who needs it — <strong>fresh, local, and full of dignity.</strong>
        </p>
        <div className="need-steps">
          <div className="need-step">
            <div className="need-num">1</div>
            <div className="need-step-body">
              <h4>Reach Out</h4>
              <p>Call or email Adam to let us know what you have. We'll coordinate pickup or drop-off at a convenient time.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">2</div>
            <div className="need-step-body">
              <h4>We Handle the Rest</h4>
              <p>Our team receives your donation, sorts it, and gets it into the hands of neighbors — often within 24 hours of harvest.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">3</div>
            <div className="need-step-body">
              <h4>Watch It Grow</h4>
              <p>Your garden became someone's dinner table. That's ministry.</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="btn btn-gold" href="mailto:adam@cropsforchrist.org?subject=I%20want%20to%20donate%20produce">Contact Adam →</a>
          <button className="btn btn-amber" onClick={onBack}>← Other Ways to Give</button>
        </div>
        <div className="converge-banner" onClick={onGospel}>
          <div className="converge-cross">✝</div>
          <div className="converge-text">
            <h4>Want to know why this matters eternally?</h4>
            <p>Your produce is more than food. Discover the Gospel story behind every gift.</p>
          </div>
          <div className="converge-arrow">→</div>
        </div>
      </div>
    </section>
  );
}