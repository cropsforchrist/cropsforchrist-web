'use client';

import { useState } from 'react';
import SceneIntro from './components/SceneIntro';
import SceneChoose from './components/SceneChoose';
import SceneDonor from './components/SceneDonor';
import SceneNeed from './components/SceneNeed';
import SceneGospel from './components/SceneGospel';

type Scene = 'intro' | 'choose' | 'donor' | 'need' | 'gospel';

export default function Home() {
  const [scene, setScene] = useState<Scene>('intro');

  return (
    <main>
      {scene === 'intro' && (
        <SceneIntro onNext={() => setScene('choose')} />
      )}
      {scene === 'choose' && (
        <SceneChoose
          onDonor={() => setScene('donor')}
          onNeed={() => setScene('need')}
          onGospel={() => setScene('gospel')}
        />
      )}
      {scene === 'donor' && (
        <SceneDonor
          onProduce={() => setScene('donor')}
          onTime={() => setScene('donor')}
          onCash={() => setScene('donor')}
          onGospel={() => setScene('gospel')}
          onBack={() => setScene('choose')}
        />
      )}
      {scene === 'need' && (
        <SceneNeed
          onGospel={() => setScene('gospel')}
          onBack={() => setScene('choose')}
        />
      )}
      {scene === 'gospel' && (
        <SceneGospel
          onDonor={() => setScene('donor')}
          onNeed={() => setScene('need')}
          onBack={() => setScene('choose')}
        />
      )}
    </main>
  );
}