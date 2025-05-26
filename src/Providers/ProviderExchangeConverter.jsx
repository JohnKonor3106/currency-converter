import { useImmerReducer } from 'use-immer';
import React, { useContext, useMemo } from 'react';
import reducerConvert from '../Reducers/reducerConvert';
import { ContextGlobalError } from './ProviderGlobalError';
import { uniqueId } from 'lodash';
import convertCurrency from '../components/Services/converterApi';

export const ContextExchangeConverter = React.createContext({});

const initState = {
  amount: '',
  list: [
    { code: 'USD', id: uniqueId('curr-') },
    { code: 'RUB', id: uniqueId('curr-') },
    { code: 'EUR', id: uniqueId('curr-') },
  ],
  from: '',
  to: '',
  result: null,
  loading: false,
};

const ProviderExchangeConverter = ({ children }) => {
  const [stateConverter, dispatch] = useImmerReducer(reducerConvert, initState);
  const { handleError } = useContext(ContextGlobalError);

  const setAmount = e => {
    dispatch({ type: 'ADD_CURRENCY_AMOUNT', payload: e.target.value });
  };

  const setValueCurrencyFrom = e => {
    dispatch({ type: 'ADD_CURRENCY_FROM', payload: e.target.value });
  };

  const setValueCurrencyTo = e => {
    dispatch({ type: 'ADD_CURRENCY_TO', payload: e.target.value });
  };

  const handleClickReverse = () => {
    dispatch({ type: 'REVERSE_CURRENCY' });
    console.log('from' + stateConverter.from);
    console.log('from' + stateConverter.to);
  };

  const handleConvert = async () => {
    const { amount, from, to } = stateConverter;
    try {
      dispatch({ type: 'LOADING_DATA', payload: true });
      const currencyRate = await convertCurrency({ amount, from, to });

      dispatch({ type: 'CURRENCY_CONVERTING', payload: currencyRate.result });
      dispatch({ type: 'LOADING_DATA', payload: false });
    } catch (error) {
      handleError(error);
      dispatch({ type: 'LOADING_DATA', payload: false });
      console.error('Ошибка при конвертации валюты:', error.message);
    }
  };

  const valueProviderConvert = useMemo(
    () => ({
      converter: stateConverter,
      setAmount: setAmount,
      setValueCurrencyFrom: setValueCurrencyFrom,
      setValueCurrencyTo: setValueCurrencyTo,
      handleConvert: handleConvert,
      handleClickReverse: handleClickReverse,
    }),
    [
      stateConverter,
      setAmount,
      setValueCurrencyFrom,
      setValueCurrencyTo,
      handleClickReverse,
      handleConvert,
    ]
  );

  return (
    <ContextExchangeConverter.Provider value={valueProviderConvert}>
      {children}
    </ContextExchangeConverter.Provider>
  );
};

export default ProviderExchangeConverter;
