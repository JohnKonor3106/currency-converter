import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import React, { useMemo } from 'react';
import { useContext } from 'react';
import { ContextGlobalError } from './ProviderGlobalError';
import reducerExchangeRate from '../Reducers/reducerExchangeRate';
import getExchangeRate from '../components/Services/exchangeApi';

export const ContextExchangeRate = React.createContext({});

const initState = {
  basicCode: '',
  list: [
    { code: 'USD', id: uniqueId('curr-') },
    { code: 'RUB', id: uniqueId('curr-') },
    { code: 'EUR', id: uniqueId('curr-') },
  ],
  currencyExchangeRate: null,
  initCurrencyExchangeRate: null,
  tern: '',
  loading: false,
};

const ProviderExchangeRate = ({ children }) => {
  const [stateExchangeRate, dispatch] = useImmerReducer(
    reducerExchangeRate,
    initState
  );
  const { handleError } = useContext(ContextGlobalError);

  const setBasicCode = e => {
    dispatch({ type: 'ADD_BASE_CODE_CURRENCY', payload: e.target.value });
  };

  const handleConversionRates = async () => {
    try {
      dispatch({ type: 'LOADING_DATA', payload: true });
      const exchangeRateData = await getExchangeRate(
        stateExchangeRate.basicCode
      );

      dispatch({ type: 'ADD_EXCHANGE_RATE_DATA', payload: exchangeRateData });
      dispatch({ type: 'LOADING_DATA', payload: false });
    } catch (error) {
      handleError(error);
      dispatch({ type: 'LOADING_DATA', payload: false });
      console.error('Ошибка при получение курса валют:', error.message);
    }
  };

  const handleFindRate = e => {
    const newTernValue = e.target.value;

    dispatch({ type: 'ADD_VALUE_TERN', payload: newTernValue });
    dispatch({
      type: 'FIND_CURRENCY',
      payload: { tern: newTernValue },
    });
  };

  const valueExchangeRate = useMemo(
    () => ({
      exchangeRate: stateExchangeRate,
      setBasicCode: setBasicCode,
      handleConversionRates: handleConversionRates,
      handleFindRate: handleFindRate,
    }),
    [stateExchangeRate, setBasicCode, handleConversionRates, handleFindRate]
  );

  return (
    <ContextExchangeRate.Provider value={valueExchangeRate}>
      {children}
    </ContextExchangeRate.Provider>
  );
};

export default ProviderExchangeRate;
