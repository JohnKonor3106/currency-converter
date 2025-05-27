// ProviderExchangeChart.jsx
import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import { useContext, useMemo, useCallback, useEffect } from 'react';
import React from 'react';
import reducerExchangeChart from '../Reducers/reducerExchangeChart';
import { ContextGlobalError } from './ProviderGlobalError';
import getExchangeChart from '../Services/exchangeChartApi';
import { getChartDataByPeriod } from '../Utils/utils';

export const ContextExchangeChart = React.createContext({});

const initState = {
  historicalChart: {
    fixedExchangeChartData: [],
    data: [],
    currentPeriod: 'All',
  },
  currency: {
    list: [
      { code: 'USD', id: uniqueId('curr-') },
      { code: 'RUB', id: uniqueId('curr-') },
      { code: 'EUR', id: uniqueId('curr-') },
    ],
    from: '',
    to: '',
  },
  loading: false,
  hasFullChartDataLoaded: false,
};

const ProviderExchangeChart = ({ children }) => {
  const [stateExchangeChart, dispatch] = useImmerReducer(
    reducerExchangeChart,
    initState
  );
  const { handleError } = useContext(ContextGlobalError);

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

  const handleExchangeChart = useCallback(async () => {
    const { from, to } = stateExchangeChart.currency;
    const { currentPeriod, fixedExchangeChartData } =
      stateExchangeChart.historicalChart;

    if (!from || !to) {
      handleError(new Error('Пожалуйста, выберите обе валюты для графика.'));
      return;
    }

    try {
      dispatch({ type: 'LOADING_DATA', payload: true });

      let dataToFilter = fixedExchangeChartData;

      if (!fixedExchangeChartData.length) {
        const apiData = await getExchangeChart({ from, to });
        dataToFilter = apiData;
        dispatch({
          type: 'SET_FULL_CHART_DATA',
          payload: apiData,
        });
        dispatch({ type: 'SET_HAS_FULL_CHART_DATA_LOADED', payload: true });
      }

      const filtered = getChartDataByPeriod(dataToFilter, currentPeriod);

      dispatch({
        type: 'SET_DISPLAYED_CHART_DATA',
        payload: filtered,
      });
    } catch (error) {
      handleError(error);
      console.error(
        'Ошибка при получении или фильтрации графика валют:',
        error.message
      );
    } finally {
      dispatch({ type: 'LOADING_DATA', payload: false });
    }
  }, [
    stateExchangeChart.currency.from,
    stateExchangeChart.currency.to,
    stateExchangeChart.historicalChart.fixedExchangeChartData,
    stateExchangeChart.historicalChart.currentPeriod,
    dispatch,
    handleError,
  ]);

  const valueExchangeChart = useMemo(
    () => ({
      exchangeChart: stateExchangeChart,
      setExchangeChartFrom,
      setExchangeChartTo,
      handleExchangeChart,
      setExchangeChartPeriod,
    }),
    [
      stateExchangeChart,
      setExchangeChartFrom,
      setExchangeChartTo,
      handleExchangeChart,
      setExchangeChartPeriod,
    ]
  );

  return (
    <ContextExchangeChart.Provider value={valueExchangeChart}>
      {children}
    </ContextExchangeChart.Provider>
  );
};

export default ProviderExchangeChart;
