import ExchangeTab from './components/Exchange-tabs/tabs';
import ProviderGlobalError from './Providers/ProviderGlobalError';
import ProviderExchangeConverter from './Providers/ProviderExchangeConverter';
import ProviderExchangeRate from './Providers/ProviderExchangeRate';
import ProviderExchangeChart from './Providers/ProviderExchangeChart';
import ProviderExchangeTabs from './Providers/ProviderExchangeTabs';

function App() {
  return (
    <>
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
      </ProviderGlobalError>
    </>
  );
}

export default App;
