import { ContextExchangeTabs } from '../../Providers/ProviderExchangeTabs';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import { memo, useContext, lazy, Suspense } from 'react';
import ConverterForm from '../Exchange-converter/Form/ConverterForm';
import ExchangeTable from '../Exchange-rate-table/Table';

const LazyExchangeChart = lazy(
  () => import('../Exchange_historical/ExchangeChart')
);

const ExchangeTab = memo(() => {
  const { stateTab, handleActiveTab } = useContext(ContextExchangeTabs);
  const renderTabContent = title => {
    if (title === 'Converter') {
      return <ConverterForm />;
    } else if (title === 'Exchange rate') {
      return <ExchangeTable />;
    } else if (title === 'Exchange chart') {
      return (
        <Suspense
          fallback={
            // Оборачиваем Spinner в div с Flexbox-утилитами
            <div
              className='d-flex justify-content-center align-items-center'
              style={{ height: '200px' }}
            >
              <Spinner animation='border' variant='success' />
            </div>
          }
        >
          <LazyExchangeChart />
        </Suspense>
      );
    }
    return null;
  };

  return (
    <Tabs
      activeKey={stateTab.active}
      transition={true}
      unmountOnExit={false}
      onSelect={eventKey => handleActiveTab(eventKey)}
      className='mb-3'
    >
      {stateTab.list.map(({ title, id }) => (
        <Tab key={id} eventKey={title} title={title}>
          {renderTabContent(title)}
        </Tab>
      ))}
    </Tabs>
  );
});
export default ExchangeTab;
