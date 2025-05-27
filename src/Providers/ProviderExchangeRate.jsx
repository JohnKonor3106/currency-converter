import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import React, { useMemo, useCallback } from 'react';
import { useContext } from 'react';
import { ContextGlobalError } from './ProviderGlobalError';
import reducerExchangeRate from '../Reducers/reducerExchangeRate';
import getExchangeRate from '../Services/exchangeApi';

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

  const setBasicCode = useCallback(
    e => {
      dispatch({ type: 'ADD_BASE_CODE_CURRENCY', payload: e.target.value });
    },
    [dispatch]
  );

  const handleConversionRates = useCallback(async () => {
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
  }, [dispatch, stateExchangeRate.basicCode, handleError]);

  const handleFindRate = useCallback(
    e => {
      dispatch({ type: 'ADD_VALUE_TERN', payload: e.target.value });

      dispatch({
        type: 'FIND_CURRENCY',
        payload: { tern: e.target.value },
      });
    },
    [dispatch]
  );

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
