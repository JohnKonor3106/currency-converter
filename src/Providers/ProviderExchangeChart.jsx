import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import { useContext, useMemo } from 'react';
import React from 'react';
import reducerExchangeChart from '../Reducers/reducerExchangeChart';
import { ContextGlobalError } from './ProviderGlobalError';
import getExchangeChart from '../components/Services/exchangeChartApi';

export const ContextExchangeChart = React.createContext({});

const initState = {
  exchangeData: null,
  currency: {
    list: [
      { code: 'USD', id: uniqueId('curr-') },
      { code: 'RUB', id: uniqueId('curr-') },
      { code: 'EUR', id: uniqueId('curr-') },
    ],
    from: '',
    to: '',
  },
};

const ProviderExchangeChart = ({ children }) => {
  const [stateExchangeChart, dispatch] = useImmerReducer(
    reducerExchangeChart,
    initState
  );
  const { handleError } = useContext(ContextGlobalError);

  const setExchangeChartFrom = e => {
    dispatch({ type: 'ADD_CURRENCY_FOR_CHART_FROM', payload: e.target.value });
    console.log(stateExchangeChart.currency.from);
  };

  const setExchangeChartTo = e => {
    dispatch({ type: 'ADD_CURRENCY_FOR_CHART_TO', payload: e.target.value });
    console.log(stateExchangeChart.currency.to);
  };

  const handleExchangeChart = async () => {
    const { from, to } = stateExchangeChart.currency;
    try {
      dispatch({ type: 'LOADING_DATA', payload: true });
      const exchangeChartData = await getExchangeChart({ from, to });

      dispatch({ type: 'ADD_EXCHANGE_CHART_DATA', payload: exchangeChartData });
      dispatch({ type: 'LOADING_DATA', payload: false });
    } catch (error) {
      handleError(error);
      dispatch({ type: 'LOADING_DATA', payload: false });
      console.error('Ошибка при получение графикв валют:', error.message);
    }
  };

  const valueExchangeChart = useMemo(
    () => ({
      exchangeChart: stateExchangeChart,
      setExchangeChartFrom: setExchangeChartFrom,
      setExchangeChartTo: setExchangeChartTo,
      handleExchangeChart: handleExchangeChart,
    }),
    [
      stateExchangeChart,
      setExchangeChartFrom,
      setExchangeChartTo,
      handleExchangeChart,
    ]
  );

  return (
    <ContextExchangeChart.Provider value={valueExchangeChart}>
      {children}
    </ContextExchangeChart.Provider>
  );
};

export default ProviderExchangeChart;
