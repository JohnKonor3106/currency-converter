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
import { useContext } from 'react';
import { ContextExchangeChart } from '../../Providers/ProviderExchangeChart';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';

const ExchangeChart = () => {
  const {
    exchangeChart,
    handleExchangeChart,
    setExchangeChartFrom,
    setExchangeChartTo,
  } = useContext(ContextExchangeChart);

  const { exchangeData } = exchangeChart;

  return (
    <>
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
      {!exchangeData ? (
        <div className='mt-5 mb-5 text-center'> НЕТ ДАННЫХ </div>
      ) : (
        <ResponsiveContainer width='100%' height={250}>
          <LineChart
            data={exchangeData}
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
      ></ExchangeButton>
    </>
  );
};

export default ExchangeChart;
