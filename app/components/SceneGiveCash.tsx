'use client';

interface Props {
  onGospel: () => void;
  onBack: () => void;
}

export default function SceneGiveCash({ onGospel, onBack }: Props) {
  return (
    <section className="scene scroll">
      <div className="inner">
        <div className="badge amber">💰 Financial Giving</div>
        <h1 className="scene-h1">Every Dollar<br />is a <em>Seed.</em></h1>
        <p className="body-text">
          Crops for Christ is a <strong>501(c)3 public charity</strong>. Your financial gift is
          tax-deductible and goes directly to growing, harvesting, and distributing fresh food
          to neighbors in need.
        </p>
        <div className="tier-list">
          <div className="tier">
            <div className="tier-amt">$25<sub>/mo</sub></div>
            <div className="tier-text">
              <h4>🌱 Seed Planter</h4>
              <p>Provides seeds, soil, and supplies for one full raised bed — fresh vegetables for a family all season long.</p>
            </div>
          </div>
          <div className="tier">
            <div className="tier-amt">$50<sub>/mo</sub></div>
            <div className="tier-text">
              <h4>🌾 Field Worker</h4>
              <p>Sponsors a full growing plot including equipment, seeds, and teaching materials.</p>
            </div>
          </div>
          <div className="tier">
            <div className="tier-amt">$100<sub>/mo</sub></div>
            <div className="tier-text">
              <h4>🏆 Harvest Champion</h4>
              <p>Fully funds one outreach cycle — harvest, transport, and distribution to families across Centre County.</p>
            </div>
          </div>
          <div className="tier">
            <div className="tier-amt" style={{fontSize:'1.3rem'}}>Partner</div>
            <div className="tier-text">
              <h4>🤝 Business Partner</h4>
              <p>Join local businesses in sponsoring the ministry. Co-branding, community recognition, and a legacy that matters.</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="btn btn-gold" href="mailto:adam@cropsforchrist.org?subject=I%20want%20to%20give">Give Now →</a>
          <button className="btn btn-amber" onClick={onBack}>← Other Ways to Give</button>
        </div>
        <div className="converge-banner" onClick={onGospel}>
          <div className="converge-cross">✝</div>
          <div className="converge-text">
            <h4>Why do we give? It starts with what we've received.</h4>
            <p>Before we ever fed a neighbor, we were fed. Discover the story that changes everything.</p>
          </div>
          <div className="converge-arrow">→</div>
        </div>
      </div>
    </section>
  );
}