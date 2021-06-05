import type { FC } from 'react';

import { BreakPointIndicator } from './components/BreakPointIndicator';
import { Header } from './Header';
import { MainView } from './MainView';

const App: FC = () => {
  return (
    <div className="2xl:container mx-auto px-2 md:px-4">
      <BreakPointIndicator />
      <Header />
      <MainView />
    </div>
  );
};

export default App;
