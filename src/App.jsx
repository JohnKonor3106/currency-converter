import { useImmerReducer } from 'use-immer';
import { uniqueId } from 'lodash';
import ExchangeTab from './components/Exchange-tabs/tabs';
import ConverterForm from './components/Exchange-converter/Form/ConverterForm';
import ConvertDisplay from './components/Exchange-converter/Display/ResultDisplay';
import { ConvertContext } from './components/StateApp/stateApp';
import getExchangeRate from './components/Servies/exchangeApi';
import getExchangeChart from './components/Servies/exchangeChartApi';
import convertCurrency from './components/Servies/converterApi';
import reducerConvert from './Reducers/reducer';
import ExchangeTable from './components/Exchange-rate-table/Table';
import ExchangeChart from './components/Exchange_historical/ExchangeChart';

function App() {
  const initState = {
    converter: {
      amount: '',
      list: [
        { code: 'USD', id: uniqueId('curr-') },
        { code: 'RUB', id: uniqueId('curr-') },
        { code: 'EUR', id: uniqueId('curr-') },
        { code: 'GBP', id: uniqueId('curr-') },
      ],
      from: '',
      to: '',
      result: null,
      loading: false,
    },
    exchangeRate: {
      basicCode: '',
      list: [
        { code: 'USD', id: uniqueId('curr-') },
        { code: 'RUB', id: uniqueId('curr-') },
        { code: 'EUR', id: uniqueId('curr-') },
        { code: 'GBP', id: uniqueId('curr-') },
      ],
      currencyExchangeRate: null,
      loading: false,
      error: null,
    },
    exchangeChart: {
      exchangeData: null,
      currency: {
        list: [
          { code: 'USD', id: uniqueId('curr-') },
          { code: 'RUB', id: uniqueId('curr-') },
          { code: 'EUR', id: uniqueId('curr-') },
          { code: 'GBP', id: uniqueId('curr-') },
        ],
        from: '',
        to: '',
      },
    },
    tabs: {
      list: [
        { title: 'Converter', id: uniqueId() },
        { title: 'Exchange rate', id: uniqueId() },
        { title: 'Exchange chart', id: uniqueId() },
      ],
      active: 'Converter',
    },
    errors: null,
  };

  const [convertState, dispatch] = useImmerReducer(reducerConvert, initState);

  const setAmount = ({ target: value }) => {
    dispatch({ type: 'ADD_CURRENCY_AMOUNT', payload: value });
    console.log(convertState.converter.amount);
  };

  const setValueCurrencyFrom = ({ target: value }) => {
    dispatch({ type: 'ADD_CURRENCY_FROM', payload: value });
  };

  const setValueCurrencyTo = ({ target: value }) => {
    dispatch({ type: 'ADD_CURRENCY_TO', payload: value });
  };

  const handleConvert = async () => {
    const { amount, from, to } = convertState.converter;
    try {
      dispatch({ type: 'LOADING_DATA', payload: { status: true } });
      const currencyRate = await convertCurrency({ amount, from, to });

      dispatch({ type: 'CURRENCY_CONVERTING', payload: currencyRate.result });
      dispatch({ type: 'LOADING_DATA', payload: { status: false } });
    } catch (err) {
      dispatch({ type: 'ERROR_HEADING', payload: { err: err.message } });
      dispatch({ type: 'LOADING_DATA', payload: { status: false } });
      console.error('Ошибка при конвертации валюты:', err.message);
    }
  };
  const setBasicCode = e => {
    dispatch({ type: 'ADD_BASE_CODE_CURRENCY', payload: e.target.value });
    console.log(convertState.exchangeRate.basicCode);
  };

  const handleConversionRates = async () => {
    try {
      dispatch({ type: 'LOADING_DATA', payload: { status: true } });
      const exchangeRateData = await getExchangeRate(
        convertState.exchangeRate.basicCode
      );

      dispatch({ type: 'ADD_EXCHANGE_RATE_DATA', payload: exchangeRateData });
      dispatch({ type: 'LOADING_DATA', payload: { status: false } });
    } catch (err) {
      dispatch({ type: 'ERROR_HEADING', payload: { errors: err.message } });
      dispatch({ type: 'LOADING_DATA', payload: { status: false } });
      console.error('Ошибка при получение курса валют:', err.message);
    }
  };

  const setExchangeChartFrom = e => {
    dispatch({ type: 'ADD_CURRENCY_FOR_CHART_FROM', payload: e.target.value });
  };

  const setExchangeChartTo = e => {
    dispatch({ type: 'ADD_CURRENCY_FOR_CHART_TO', payload: e.target.value });
  };

  const handleExchangeChart = async () => {
    const { from, to } = convertState.exchangeChart.currency;
    try {
      dispatch({ type: 'LOADING_DATA', payload: { status: true } });
      const exchangeChartData = await getExchangeChart({ from, to });

      dispatch({ type: 'ADD_EXCHANGE_CHART_DATA', payload: exchangeChartData });
      dispatch({ type: 'LOADING_DATA', payload: { status: false } });
    } catch (err) {
      dispatch({ type: 'ERROR_HEADING', payload: { errors: err.message } });
      dispatch({ type: 'LOADING_DATA', payload: { status: false } });
      console.error('Ошибка при получение графикв валют:', err.message);
    }
  };

  const handleActiveTab = eventKey => {
    dispatch({
      type: 'CHANGE_ACTIVE_TAB',
      payload: eventKey,
    });
  };

  return (
    <>
      <ConvertContext.Provider
        value={{
          currentCurrency: convertState,
          setValueCurrencyFrom: setValueCurrencyFrom,
          setValueCurrencyTo: setValueCurrencyTo,
          setAmount: setAmount,
          handleConvert: handleConvert,
          handleActiveTab: handleActiveTab,
          setBasicCode: setBasicCode,
          handleConversionRates: handleConversionRates,
          setExchangeChartFrom: setExchangeChartFrom,
          setExchangeChartTo: setExchangeChartTo,
          handleExchangeChart: handleExchangeChart,
        }}
      >
        <ExchangeTab />

        {convertState.tabs.active === 'Converter' && (
          <>
            <ConverterForm />
            <ConvertDisplay />
          </>
        )}
        {convertState.tabs.active === 'Exchange rate' && <ExchangeTable />}
        {convertState.tabs.active === 'Exchange chart' && <ExchangeChart />}
      </ConvertContext.Provider>
    </>
  );
}

export default App;
