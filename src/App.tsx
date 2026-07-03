import type { ReactElement } from 'react';

import { FormWrapper } from './components/FormWrapper';
import { Actions } from './components/layout/Actions';
import { MastHead } from './components/layout/MastHead';
import { Receipt } from './components/layout/Receipt';
import { Shares } from './components/layout/Shares';
import { TotallingMessage } from './components/layout/TotallingMessage';
import { ViewportProvider } from './hooks/useViewport';
import { Footer } from './Footer';
import { Header } from './Header';

function App(): ReactElement {
  return (
    <ViewportProvider>
      <div className="min-h-screen px-3 py-5 sm:px-5 lg:px-8">
        <main className="mx-auto w-full">
          <FormWrapper>
            {(properties) => (
              <>
                <MastHead>
                  <Header />
                  <Receipt {...properties} />
                </MastHead>
                <Shares values={properties.values} />
                <TotallingMessage values={properties.values} />
                <Actions />
              </>
            )}
          </FormWrapper>
        </main>
        <Footer />
      </div>
    </ViewportProvider>
  );
}

export default App;
