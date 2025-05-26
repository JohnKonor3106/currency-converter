import React from 'react';
import { uniqueId } from 'lodash';
import { useImmerReducer } from 'use-immer';
import { useContext, useEffect, useMemo } from 'react';
import { ContextGlobalError } from './ProviderGlobalError';
import reducerExchangeTabs from '../Reducers/reducerExchangeTabs';

export const ContextExchangeTabs = React.createContext({});

const initStateTabs = {
  list: [
    { title: 'Converter', id: uniqueId() },
    { title: 'Exchange rate', id: uniqueId() },
    { title: 'Exchange chart', id: uniqueId() },
  ],
  active: 'Converter',
};

const ProviderExchangeTabs = ({ children }) => {
  const [tabs, dispatch] = useImmerReducer(reducerExchangeTabs, initStateTabs);
  const { handleError, handleClearError } = useContext(ContextGlobalError);

  const handleActiveTab = eventKey => {
    try {
      if (!eventKey) {
        throw new Error('Ошибка! Активного ключа таба не найдено.');
      }
      dispatch({
        type: 'CHANGE_ACTIVE_TAB',
        payload: eventKey,
      });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    handleClearError();
  }, [tabs.active]);

  const valueExchangeTab = useMemo(
    () => ({
      stateTab: tabs,
      handleActiveTab: handleActiveTab,
    }),
    [tabs, handleActiveTab]
  );

  return (
    <ContextExchangeTabs.Provider value={valueExchangeTab}>
      {children}
    </ContextExchangeTabs.Provider>
  );
};

export default ProviderExchangeTabs;
