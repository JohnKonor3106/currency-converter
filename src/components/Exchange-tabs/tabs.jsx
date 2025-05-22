import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useContext } from 'react';
import { ConvertContext } from '../StateApp/stateApp';

const ExchangeTab = () => {
  const { currentCurrency, handleActiveTab } = useContext(ConvertContext);
  const { exchangeRate, tabs } = currentCurrency;

  return (
    <Tabs
      activeKey={tabs.active}
      transition={true}
      onSelect={handleActiveTab}
      className='mb-3'
    >
      {tabs.list.map(({ title, id }) => {
        return <Tab key={id} eventKey={title} title={title}></Tab>;
      })}
    </Tabs>
  );
};

export default ExchangeTab;
