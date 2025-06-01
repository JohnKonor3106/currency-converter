import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import React, { useMemo, useCallback, useEffect, useContext } from 'react';
import { ContextGlobalError } from './ProviderGlobalError';
import reducerExchangeRate from '../Reducers/reducerExchangeRate';
import getExchangeRate from '../Services/exchangeApi';
import getDinamicRiseCurrency from '../Utils/dinamicRiseCurrency';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export const ContextExchangeRate = React.createContext({});

const initState = {
  basicCode: '',
  list: [
    { code: 'USD', id: uniqueId('curr-') },
    { code: 'RUB', id: uniqueId('curr-') },
    { code: 'EUR', id: uniqueId('curr-') },
  ],
  currentExchangeRate: null,
  fullExchangeRateData: null,
  tern: '',
  isCashed: false, // будет нужен для уведомления пользавателей
  loading: false,
  localErrors: {}, // пока под вопросом
};

const ProviderExchangeRate = ({ children }) => {
  const [stateExchangeRate, dispatch] = useImmerReducer(
    reducerExchangeRate,
    initState
  );
  const { handleError } = useContext(ContextGlobalError);
  const queryClient = useQueryClient();

  const setBasicCode = useCallback(
    e => {
      dispatch({ type: 'ADD_BASE_CODE_CURRENCY', payload: e.target.value });
    },
    [dispatch]
  );

  const {
    data: exchangeRateData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['exchangeRate', stateExchangeRate.basicCode],
    queryFn: async () => {
      if (!stateExchangeRate.basicCode) {
        throw new Error('Базовая валюта не выбрана');
      }
      console.log('api');
      return getExchangeRate(stateExchangeRate.basicCode);
    },
    select: apiData => {
      const oldExchangeRate = queryClient.getQueryData([
        'exchangeRate',
        stateExchangeRate.basicCode,
      ]);

      return getDinamicRiseCurrency(oldExchangeRate, apiData);
    },
    enabled: !!stateExchangeRate.basicCode,
  });

  useEffect(() => {
    if (isFetching) {
      dispatch({ type: 'LOADING_DATA', payload: isFetching });
    }
  }, [isFetching, dispatch]);

  useEffect(() => {
    if (error) {
      handleError(error);
      dispatch({
        type: 'SET_TABLE_RATE_ERROR',
        payload: { type: 'currency_rate', description: error.message },
      });
    } else {
      dispatch({ type: 'CLEAR_LOCAL_ERRORS' });
    }
  }, [error, handleError, dispatch]);

  useEffect(() => {
    if (exchangeRateData) {
      dispatch({
        type: 'ADD_EXCHANGE_RATE_DATA', // Это действие просто устанавливает currentExchangeRate
        payload: exchangeRateData, // exchangeRateData уже содержит динамику
      });
      dispatch({ type: 'ADD_CASHED_EXCHANGE_RATE', payload: true });
    }
  }, [exchangeRateData, dispatch]);

  const handleFindRate = useCallback(
    e => {
      const newTern = e.target.value;
      dispatch({ type: 'ADD_VALUE_TERN', payload: newTern });

      dispatch({
        type: 'FIND_CURRENCY',
        payload: { tern: newTern },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    let timer;
    if (stateExchangeRate.isCashed) {
      timer = setTimeout(() => {
        dispatch({ type: 'ADD_CASHED_EXCHANGE_RATE', payload: false });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [stateExchangeRate.isCashed, dispatch]);

  const valueExchangeRate = useMemo(
    () => ({
      exchangeRate: stateExchangeRate,
      setBasicCode: setBasicCode,
      handleFindRate: handleFindRate,
    }),
    [stateExchangeRate, setBasicCode, handleFindRate]
  );

  return (
    <ContextExchangeRate.Provider value={valueExchangeRate}>
      {children}
    </ContextExchangeRate.Provider>
  );
};

export default ProviderExchangeRate;
