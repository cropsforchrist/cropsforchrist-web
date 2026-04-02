'use client';

interface Props {
  onDonor: () => void;
  onNeed: () => void;
  onBack: () => void;
}

export default function SceneGospel({ onDonor, onNeed, onBack }: Props) {
  return (
    <section className="scene scroll">
      <div className="inner">
        <div className="badge holy">✝ The Gospel</div>
        <h1 className="scene-h1">A Hunger Only <em>He</em> Can Fill</h1>
        <p className="body-text">
          Every seed we plant, every harvest we share, every hour we volunteer flows from one source.
          There is a God who loves you with a love that outlasts every season.
        </p>
        <div className="convergence-note">
          <p>Whether you came here to <strong>give</strong>, to <strong>receive</strong>, or simply because you were <strong>searching</strong> — you're in the same place now. And this is the part that changes everything.</p>
        </div>
        <div className="gospel-path">
          <div className="gospel-step">
            <div className="gospel-num">01</div>
            <div className="gospel-step-body">
              <h3>God Created You and Loves You</h3>
              <p>Before you were born, God knew you. You were made in His image, for relationship with Him — not as a servant, but as a beloved child.</p>
            </div>
          </div>
          <div className="gospel-step">
            <div className="gospel-num">02</div>
            <div className="gospel-step-body">
              <h3>We've All Wandered Away</h3>
              <p>Every one of us has turned from God. That separation is called sin, and nothing we do can fully close it — not feeding the hungry, not living a good life.</p>
            </div>
          </div>
          <div className="gospel-step">
            <div className="gospel-num">03</div>
            <div className="gospel-step-body">
              <h3>Jesus Crossed the Distance</h3>
              <p>God sent His Son — Jesus Christ — who lived perfectly, died on a cross to pay for every sin, and rose from the grave. The way home is open.</p>
            </div>
          </div>
          <div className="gospel-step">
            <div className="gospel-num">04</div>
            <div className="gospel-step-body">
              <h3>Respond in Faith</h3>
              <p>You can't earn it. You don't have to clean yourself up first. Simply trust in Jesus and what He did for you. That's it. That's the whole thing.</p>
            </div>
          </div>
        </div>
        <div className="prayer-card">
          <h3>A Prayer to Begin</h3>
          <p>
            "Lord Jesus, I know I've fallen short.<br />
            I believe You died for me and rose again.<br />
            I turn from my own way and trust in You.<br />
            Come into my life. Be my Lord and my Savior.<br />
            Amen."
          </p>
        </div>
        <div className="actions">
          <a className="btn btn-gold" href="mailto:adam@cropsforchrist.org?subject=I%20want%20to%20know%20more%20about%20faith">Talk to Us →</a>
          <a className="btn btn-amber" href="tel:8142644769">Call 814-264-GROW</a>
        </div>
        <div className="hdivider"><span>✝</span></div>
        <div className="actions" style={{ justifyContent: 'center' }}>
          <button className="btn btn-amber" onClick={onDonor}>I Want to Give</button>
          <button className="btn btn-green" onClick={onNeed}>I Need Support</button>
        </div>
        <button className="btn btn-ghost" onClick={onBack}>← Choose Another Path</button>
      </div>
    </section>
  );
}