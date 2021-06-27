import React, { FC } from 'react';

import { BreakPointIndicator } from './components/BreakPointIndicator';
import { Header } from './Header';
import { MainView } from './MainView';
import { ViewportProvider } from './hooks/useViewport';

const App: FC = () => (
  <ViewportProvider>
    <div className="px-2 md:px-4">
      <BreakPointIndicator />
      <Header />
      <MainView />
    </div>
  </ViewportProvider>
);

export default App;
