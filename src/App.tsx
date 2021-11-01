import type { ReactElement } from 'react';

import { BreakPointIndicator } from './components/BreakPointIndicator';
import { FormWrapper } from './components/FormWrapper';
import { Actions } from './components/layout/Actions';
import { MastHead } from './components/layout/MastHead';
import { Receipt } from './components/layout/Receipt';
import { Shares } from './components/layout/Shares';
import { ViewportProvider } from './hooks/useViewport';
import { Footer } from './Footer';
import { Header } from './Header';

function App(): ReactElement {
  return (
    <ViewportProvider>
      <div className="px-2 md:px-4">
        <BreakPointIndicator />
        <FormWrapper>
          {(properties) => (
            <>
              <MastHead>
                <Header />
                <Receipt {...properties} />
              </MastHead>
              <Shares values={properties.values} />
              <Actions />
            </>
          )}
        </FormWrapper>
        <Footer />
      </div>
    </ViewportProvider>
  );
}

export default App;
