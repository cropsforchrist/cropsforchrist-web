'use client';

import { useState } from 'react';
import Background from './components/Background';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SceneIntro from './components/SceneIntro';
import SceneChoose from './components/SceneChoose';
import SceneDonor from './components/SceneDonor';
import SceneGiveProduce from './components/SceneGiveProduce';
import SceneGiveTime from './components/SceneGiveTime';
import SceneGiveCash from './components/SceneGiveCash';
import SceneNeed from './components/SceneNeed';
import SceneGospel from './components/SceneGospel';

type Scene = 'intro' | 'choose' | 'donor' | 'give-produce' | 'give-time' | 'give-cash' | 'need' | 'gospel';

export default function Home() {
  const [scene, setScene] = useState<Scene>('intro');

  return (
    <main>
      <Background />
      {scene !== 'intro' && (
        <Nav
          onHome={() => setScene('choose')}
          onBack={() => setScene('choose')}
        />
      )}
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
          onProduce={() => setScene('give-produce')}
          onTime={() => setScene('give-time')}
          onCash={() => setScene('give-cash')}
          onGospel={() => setScene('gospel')}
          onBack={() => setScene('choose')}
        />
      )}
      {scene === 'give-produce' && (
        <SceneGiveProduce
          onGospel={() => setScene('gospel')}
          onBack={() => setScene('donor')}
        />
      )}
      {scene === 'give-time' && (
        <SceneGiveTime
          onGospel={() => setScene('gospel')}
          onBack={() => setScene('donor')}
        />
      )}
      {scene === 'give-cash' && (
        <SceneGiveCash
          onGospel={() => setScene('gospel')}
          onBack={() => setScene('donor')}
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
      <Footer />
    </main>
  );
}