import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import React, { useContext, useMemo, useCallback, useEffect } from 'react';
import reducerExchangeChart from '../Reducers/reducerExchangeChart';
import { ContextGlobalError } from './ProviderGlobalError';
import getExchangeChart from '../Services/exchangeChartApi';
import { getChartDataByPeriod } from '../Utils/utils';
import validateInputsChart from '../Utils/validateInputsChart';
import { useQuery } from '@tanstack/react-query';

export const ContextExchangeChart = React.createContext({});

const initState = {
  currentExchangeRateData: [],
  currentPeriod: 'All',
  currency: {
    list: [
      { code: 'USD', id: uniqueId('curr-') },
      { code: 'RUB', id: uniqueId('curr-') },
      { code: 'EUR', id: uniqueId('curr-') },
    ],
    from: '',
    to: '',
  },
  localErrors: {},
};

const ProviderExchangeChart = ({ children }) => {
  const [stateExchangeChart, dispatch] = useImmerReducer(
    reducerExchangeChart,
    initState
  );
  const { handleError } = useContext(ContextGlobalError);

  const { currency, currentPeriod } = stateExchangeChart;

  const setExchangeChartFrom = useCallback(
    e => {
      dispatch({
        type: 'ADD_CURRENCY_FOR_CHART_FROM',
        payload: e.target.value,
      });
    },
    [dispatch]
  );

  const setExchangeChartTo = useCallback(
    e => {
      dispatch({ type: 'ADD_CURRENCY_FOR_CHART_TO', payload: e.target.value });
    },
    [dispatch]
  );

  const setExchangeChartPeriod = useCallback(
    eventKey => {
      dispatch({ type: 'ADD_EXCHANGE_CHART_PERIOD', payload: eventKey });
    },
    [dispatch]
  );

  const {
    data: rawExchangeChartData,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['exchangeRateChart', currency.from, currency.to],
    queryFn: async () => {
      return getExchangeChart(currency.from, currency.to);
    },
    enabled: !!currency.from && !!currency.to,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (error) {
      handleError(error);
      dispatch({ type: 'SET_LOCAL_ERROR_FROM_QUERY', payload: error.message });
    } else {
      dispatch({ type: 'CLEAR_LOCAL_ERRORS' });
    }
  }, [error, handleError, dispatch]);

  useEffect(() => {
    if (rawExchangeChartData) {
      const filteredData = getChartDataByPeriod(
        rawExchangeChartData,
        currentPeriod
      );
      dispatch({
        type: 'ADD_EXCHANGE_CHART_DATA',
        payload: filteredData,
      });
    } else {
      dispatch({
        type: 'ADD_EXCHANGE_CHART_DATA',
        payload: [],
      });
    }
  }, [rawExchangeChartData, currentPeriod, dispatch]);

  const triggerValidation = useCallback(() => {
    validateInputsChart(currency.from, currency.to, dispatch);
  }, [currency.from, currency.to, dispatch]);

  const valueExchangeChart = useMemo(
    () => ({
      exchangeChart: stateExchangeChart,
      setExchangeChartFrom,
      setExchangeChartTo,
      setExchangeChartPeriod,
      isFetching,
      isLoading,
      queryError: error,
      triggerValidation,
    }),
    [
      stateExchangeChart,
      setExchangeChartFrom,
      setExchangeChartTo,
      setExchangeChartPeriod,
      isFetching,
      isLoading,
      error,
      triggerValidation,
    ]
  );

  return (
    <ContextExchangeChart.Provider value={valueExchangeChart}>
      {children}
    </ContextExchangeChart.Provider>
  );
};

export default ProviderExchangeChart;
