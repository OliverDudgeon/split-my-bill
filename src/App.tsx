import type { ReactElement } from 'react';

import { Footer } from 'Footer';
import { Header } from 'Header';

import { BreakPointIndicator } from './components/BreakPointIndicator';
import { ViewportProvider } from './hooks/useViewport';
import { MainView } from './MainView';

function App(): ReactElement {
  return (
    <ViewportProvider>
      <div className="px-2 md:px-4">
        <BreakPointIndicator />
        <Header />
        <MainView />
        <Footer />
      </div>
    </ViewportProvider>
  );
}

export default App;
