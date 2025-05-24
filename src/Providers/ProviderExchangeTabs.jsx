import React from 'react';
import { uniqueId } from 'lodash';
import { useImmerReducer } from 'use-immer';
import { ContextExchangeTabs } from '../components/StateApp/stateApp';

const initStateTabs = {
  list: [
    { title: 'Converter', id: uniqueId() },
    { title: 'Exchange rate', id: uniqueId() },
    { title: 'Exchange chart', id: uniqueId() },
  ],
  active: 'Converter',
};

const ProviderExchangeTabs = ({ children }) => {
  const [tabs, setActiveTab] = useImmerReducer(
    reducerExchangeTab,
    initStateTabs
  );

  return (
    <ContextExchangeTabs.Provider
      value={{
        stateTab: tabs,
        setActiveTab: setActiveTab,
      }}
    >
      {children}
    </ContextExchangeTabs.Provider>
  );
};

export default ProviderExchangeTabs;
