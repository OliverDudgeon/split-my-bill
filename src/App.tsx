import React, { FC } from 'react';

import { Footer } from 'Footer';

import { BreakPointIndicator } from './components/BreakPointIndicator';
import { ViewportProvider } from './hooks/useViewport';
import { Header } from './Header';
import { MainView } from './MainView';

const App: FC = () => (
  <ViewportProvider>
    <div className="px-2 md:px-4">
      <BreakPointIndicator />
      <Header />
      <MainView />
      <Footer />
    </div>
  </ViewportProvider>
);

export default App;
