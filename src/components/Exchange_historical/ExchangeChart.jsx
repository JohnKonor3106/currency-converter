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

import ExchangeButton from '../Exchange-converter/Button/ExchangeButton';
import React, { useContext, memo } from 'react';
import { ContextExchangeChart } from '../../Providers/ProviderExchangeChart';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';
import ExchangeDropDown from './ExchangeDropdown';

const ExchangeChart = memo(() => {
  const {
    exchangeChart,
    handleExchangeChart,
    setExchangeChartFrom,
    setExchangeChartTo,
  } = useContext(ContextExchangeChart);

  const { data } = exchangeChart.historicalChart;

  return (
    <div className='d-block w-50 mx-auto mt-5'>
      <ExchangeDropDown />
      <CurrencySelect
        options={exchangeChart.currency.list}
        value={exchangeChart.currency.from}
        handleChange={setExchangeChartFrom}
      />
      <CurrencySelect
        options={exchangeChart.currency.list}
        value={exchangeChart.currency.to}
        handleChange={setExchangeChartTo}
      />
      {/* Moved the conditional rendering inside the fragment */}
      {!data || data.length === 0 ? (
        <div className='mt-5 mb-5 text-center'> НЕТ ДАННЫХ </div>
      ) : (
        <ResponsiveContainer width='100%' height={250}>
          <LineChart
            data={data}
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
      <ExchangeButton
        onClick={handleExchangeChart}
        text={'Excgange chart'}
        style={'d-block w-50 mx-auto text-center mt-5 mb-5'}
      ></ExchangeButton>
    </div>
  );
});

export default React.memo(ExchangeChart);
