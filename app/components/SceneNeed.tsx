'use client';

interface Props {
  onGospel: () => void;
  onBack: () => void;
}

export default function SceneNeed({ onGospel, onBack }: Props) {
  return (
    <section className="scene scroll">
      <div className="inner">
        <div className="badge green">🌿 You Are Welcome Here</div>
        <h1 className="scene-h1">No Judgment.<br /><span className="green-em">Just Food.</span></h1>
        <p className="body-text">
          If you or someone you love is struggling to put fresh food on the table, you are in the right place.
          Crops for Christ exists <strong>for you.</strong> We grow food specifically to share with our neighbors —
          freely, graciously, no questions required.
        </p>
        <div className="privacy-note">
          <span>🔒</span>
          <p>No income forms, no embarrassing interviews, no hoops to jump through. We're a ministry — not a bureaucracy. Come as you are.</p>
        </div>
        <div className="need-steps">
          <div className="need-step">
            <div className="need-num">1</div>
            <div className="need-step-body">
              <h4>Reach Out Privately</h4>
              <p>Call or text Adam directly at 814-264-GROW (4769) or email adam@cropsforchrist.org. It's a real person — not a hotline.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">2</div>
            <div className="need-step-body">
              <h4>We'll Arrange Pickup or Delivery</h4>
              <p>We'll coordinate fresh produce pickup or deliver directly to you. No trip to an office. No waiting list if we can help it.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">3</div>
            <div className="need-step-body">
              <h4>Keep Coming Back</h4>
              <p>This isn't a one-time gift. You're welcome every season. And if you ever want to learn to grow your own food, we'd love to teach you.</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="btn btn-green" href="tel:8142644769">Call 814-264-GROW →</a>
          <a className="btn btn-ghost" href="mailto:adam@cropsforchrist.org?subject=I%20need%20food%20support">Email Us Privately</a>
        </div>
        <div className="converge-banner" onClick={onGospel}>
          <div className="converge-cross">✝</div>
          <div className="converge-text">
            <h4>You're not just welcome here — you're known.</h4>
            <p>There's a God who sees you and loves you. We'd be honored to share that story with you.</p>
          </div>
          <div className="converge-arrow">→</div>
        </div>
        <button className="btn btn-ghost" onClick={onBack}>← Choose Another Path</button>
      </div>
    </section>
  );
}