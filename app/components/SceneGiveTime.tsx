'use client';

interface Props {
  onGospel: () => void;
  onBack: () => void;
}

export default function SceneGiveTime({ onGospel, onBack }: Props) {
  return (
    <section className="scene scroll">
      <div className="inner">
        <div className="badge amber">🙌 Volunteer</div>
        <h1 className="scene-h1">Show Up.<br /><em>Change Lives.</em></h1>
        <p className="body-text">
          The most powerful thing you can give isn't money — it's presence. When you show up to serve,
          you bring <strong>hope, dignity, and the love of Christ</strong> into someone's life.
        </p>
        <div className="need-steps">
          <div className="need-step">
            <div className="need-num">🌱</div>
            <div className="need-step-body">
              <h4>Planting Days</h4>
              <p>Get your hands in the soil. We host seasonal planting days and welcome anyone willing to work alongside us.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">🌾</div>
            <div className="need-step-body">
              <h4>Harvest & Distribution</h4>
              <p>Help harvest, sort, box, and deliver fresh produce directly to families and food banks across Centre County.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">📚</div>
            <div className="need-step-body">
              <h4>Teach What You Know</h4>
              <p>Skilled in gardening, cooking, or nutrition? Come teach a neighbor. Knowledge plants seeds that outlast any harvest.</p>
            </div>
          </div>
          <div className="need-step">
            <div className="need-num">🚗</div>
            <div className="need-step-body">
              <h4>Drive & Deliver</h4>
              <p>Have a truck or van? Volunteer drivers are always needed to move produce from field to family.</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="btn btn-gold" href="mailto:adam@cropsforchrist.org?subject=I%20want%20to%20volunteer">Sign Up to Volunteer →</a>
          <button className="btn btn-amber" onClick={onBack}>← Other Ways to Give</button>
        </div>
        <div className="converge-banner" onClick={onGospel}>
          <div className="converge-cross">✝</div>
          <div className="converge-text">
            <h4>Service is worship — want to know why?</h4>
            <p>The faith behind every volunteer hour is transformative. Let us share it with you.</p>
          </div>
          <div className="converge-arrow">→</div>
        </div>
      </div>
    </section>
  );
}