import type { FC } from 'react';

import { BreakPointIndicator } from './components/BreakPointIndicator';
import { Header } from './Header';
import { MainView } from './MainView';
import { ViewportProvider } from './hooks/useViewport';

const App: FC = () => {
  return (
    <ViewportProvider>
      <div className="2xl:container mx-auto px-2 md:px-4">
        <BreakPointIndicator />
        <Header />
        <MainView />
      </div>
    </ViewportProvider>
  );
};

export default App;
