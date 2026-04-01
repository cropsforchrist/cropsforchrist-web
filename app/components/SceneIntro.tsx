'use client';

interface Props {
  onNext: () => void;
}

export default function SceneIntro({ onNext }: Props) {
  return (
    <section className="scene">
      <div className="intro-wrap">
        <div className="cross" />
        <p className="eyebrow">Bellefonte, PA · A 501(c)3 Ministry · Est. 2016</p>
        <h1 className="intro-h1">
          Crops<em>for Christ</em>
        </h1>
        <p className="intro-body">
          Growing food. Feeding neighbors. Leading souls to Jesus — one harvest at a time.
        </p>
        <button className="btn btn-gold" onClick={onNext}>
          Begin the Journey →
        </button>
      </div>
    </section>
  );
}