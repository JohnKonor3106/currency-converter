import ExchangeTab from './components/Exchange-tabs/tabs';
import ProviderGlobalError from './Providers/ProviderGlobalError';
import ProviderExchangeConverter from './Providers/ProviderExchangeConverter';
import ProviderExchangeRate from './Providers/ProviderExchangeRate';
import ProviderExchangeChart from './Providers/ProviderExchangeChart';
import ProviderExchangeTabs from './Providers/ProviderExchangeTabs';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProviderGlobalError>
          <ProviderExchangeTabs>
            <ProviderExchangeConverter>
              <ProviderExchangeRate>
                <ProviderExchangeChart>
                  <ExchangeTab />
                </ProviderExchangeChart>
              </ProviderExchangeRate>
            </ProviderExchangeConverter>
          </ProviderExchangeTabs>
          <ReactQueryDevtools initialIsOpen={false} />
        </ProviderGlobalError>
      </QueryClientProvider>
    </>
  );
}

export default App;
