'use client';

interface Props {
  onProduce: () => void;
  onTime: () => void;
  onCash: () => void;
  onGospel: () => void;
  onBack: () => void;
}

export default function SceneDonor({ onProduce, onTime, onCash, onGospel, onBack }: Props) {
  return (
    <section className="scene scroll">
      <div className="inner">
        <div className="badge amber">💛 The Giver's Path</div>
        <h1 className="scene-h1">Your Gift <em>Multiplies.</em></h1>
        <p className="body-text">
          Every gift — no matter what form it takes — is a seed. There is no wrong way to give. Here's how you can get involved:
        </p>
        <div className="give-options">
          <div className="give-opt" onClick={onProduce}>
            <div className="give-opt-icon">🥕</div>
            <div className="give-opt-title">Donate Produce</div>
            <div className="give-opt-desc">Have a garden or surplus harvest? We'll put every vegetable to work for a family in need.</div>
            <div className="give-opt-arrow">→</div>
          </div>
          <div className="give-opt" onClick={onTime}>
            <div className="give-opt-icon">🙌</div>
            <div className="give-opt-title">Donate Time</div>
            <div className="give-opt-desc">Planting, harvesting, delivering, teaching — serve with your hands and heart.</div>
            <div className="give-opt-arrow">→</div>
          </div>
          <div className="give-opt" onClick={onCash}>
            <div className="give-opt-icon">💰</div>
            <div className="give-opt-title">Donate Financially</div>
            <div className="give-opt-desc">Every dollar funds seeds, tools, and outreach to those who need it most.</div>
            <div className="give-opt-arrow">→</div>
          </div>
        </div>
        <div className="converge-banner" onClick={onGospel}>
          <div className="converge-cross">✝</div>
          <div className="converge-text">
            <h4>There's a deeper reason we do this</h4>
            <p>Every meal we give flows from one source. Discover the faith that drives it all.</p>
          </div>
          <div className="converge-arrow">→</div>
        </div>
        <button className="btn btn-ghost" onClick={onBack}>← Choose Another Path</button>
      </div>
    </section>
  );
}