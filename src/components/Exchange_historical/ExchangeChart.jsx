import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import React, { useContext, memo, useState, useEffect } from 'react';
import { ContextExchangeChart } from '../../Providers/ProviderExchangeChart';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';
import ExchangeDropDown from './ExchangeDropdown';
import Spinner from 'react-bootstrap/Spinner';

const ExchangeChart = memo(() => {
  const {
    exchangeChart,
    setExchangeChartFrom,
    setExchangeChartTo,
    setExchangeChartPeriod,
    isFetching,
    isLoading,
    queryError,
    triggerValidation,
  } = useContext(ContextExchangeChart);

  const [borderInputChartFrom, setBorderInputChartFrom] = useState('');
  const [borderInputChartTo, setBorderInputChartTo] = useState('');

  const { currentExchangeRateData, localErrors } = exchangeChart;

  useEffect(() => {
    setBorderInputChartFrom('');
    setBorderInputChartTo('');

    if (localErrors.from) {
      setBorderInputChartFrom('border border-danger');
    }

    if (localErrors.to) {
      setBorderInputChartTo('border border-danger');
    }
  }, [localErrors]);

  return (
    <div className='d-block w-50 mx-auto mt-5'>
      <ExchangeDropDown setExchangeChartPeriod={setExchangeChartPeriod} />
      <CurrencySelect
        options={exchangeChart.currency.list}
        value={exchangeChart.currency.from}
        handleChange={setExchangeChartFrom}
        className={borderInputChartFrom}
      />
      {localErrors.from && (
        <p className='text-danger text-center mb-5'>{localErrors.from}</p>
      )}

      <CurrencySelect
        options={exchangeChart.currency.list}
        value={exchangeChart.currency.to}
        handleChange={setExchangeChartTo}
        className={borderInputChartTo}
      />

      {localErrors.to && (
        <p className='text-danger text-center mb-1'>{localErrors.to}</p>
      )}

      {localErrors.query && (
        <p className='text-danger text-center mb-1'>{localErrors.query}</p>
      )}

      {isLoading || isFetching ? (
        <div className='mt-5 mb-5 text-center'>
          {' '}
          <Spinner animation='grow' variant='success' />
        </div>
      ) : !currentExchangeRateData || currentExchangeRateData.length === 0 ? (
        <div className='mt-5 mb-5 text-center'> НЕТ ДАННЫХ </div>
      ) : (
        <ResponsiveContainer width='100%' height={250}>
          <LineChart
            data={currentExchangeRateData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='value'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

export default ExchangeChart;
