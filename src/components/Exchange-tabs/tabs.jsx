import { ContextExchangeTabs } from '../../Providers/ProviderExchangeTabs';
import ExchangeChart from '../Exchange_historical/ExchangeChart';
import { Tabs, Tab } from 'react-bootstrap';
import { memo, useContext } from 'react';
import ConverterForm from '../Exchange-converter/Form/ConverterForm';
import ExchangeTable from '../Exchange-rate-table/Table';

const ExchangeTab = memo(() => {
  const { stateTab, handleActiveTab } = useContext(ContextExchangeTabs);
  const renderTabContent = title => {
    if (title === 'Converter') {
      return <ConverterForm />;
    } else if (title === 'Exchange rate') {
      return <ExchangeTable />;
    } else if (title === 'Exchange chart') {
      return <ExchangeChart />;
    }
    return null;
  };

  return (
    <Tabs
      activeKey={stateTab.active}
      transition={true}
      unmountOnExit={true}
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
