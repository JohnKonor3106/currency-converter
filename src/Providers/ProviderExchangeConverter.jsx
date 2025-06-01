import { useImmerReducer } from 'use-immer';
import React, { useContext, useMemo, useCallback, useEffect } from 'react';
import reducerConvert from '../Reducers/reducerConvert';
import { ContextGlobalError } from './ProviderGlobalError';
import { uniqueId } from 'lodash';
import convertCurrency from '../Services/converterApi';
import validateInputsConvert from '../Utils/validateInputsConvert';

export const ContextExchangeConverter = React.createContext({});

const initState = {
  amount: '',
  list: [
    { code: 'USD', id: uniqueId('curr-') },
    { code: 'RUB', id: uniqueId('curr-') },
    { code: 'EUR', id: uniqueId('curr-') },
  ],
  cachedDataCurrency: {},
  from: '',
  to: '',
  isConverterCashed: false,
  result: null,
  loading: false,
  localErrors: {},
};

const ProviderExchangeConverter = ({ children }) => {
  const [stateConverter, dispatch] = useImmerReducer(reducerConvert, initState);
  const { handleError } = useContext(ContextGlobalError);

  const setAmount = useCallback(
    e => {
      dispatch({ type: 'ADD_CURRENCY_AMOUNT', payload: e.target.value });
    },
    [dispatch]
  );

  const setValueCurrencyFrom = useCallback(
    e => {
      dispatch({ type: 'ADD_CURRENCY_FROM', payload: e.target.value });
    },
    [dispatch]
  );

  const setValueCurrencyTo = useCallback(
    e => {
      dispatch({ type: 'ADD_CURRENCY_TO', payload: e.target.value });
    },
    [dispatch]
  );

  const handleClickReverse = useCallback(() => {
    dispatch({ type: 'REVERSE_CURRENCY' });
  }, [dispatch]);

  const handleConvert = useCallback(async () => {
    const { amount, from, to } = stateConverter;
    const numericAmount = Number(amount);
    dispatch({ type: 'CLEAR_LOCAL_ERRORS' });

    const isValidateSucces = validateInputsConvert(from, to, amount, dispatch);

    if (isValidateSucces) {
      return;
    }

    const cacheKey = `${from}_${to}`;
    const cachedConversion = stateConverter.cachedDataCurrency?.[cacheKey];

    try {
      if (cachedConversion?.rate) {
        const cachedResult = cachedConversion.rate * numericAmount;
        dispatch({
          type: 'CURRENCY_CONVERTING',
          payload: {
            result: cachedResult,
            rate: cachedConversion.rate,
            cacheKey: cacheKey,
          },
        });
        dispatch({ type: 'SET_CONVERTER_CACHED_STATUS', payload: true });
      } else {
        dispatch({ type: 'ADD_CONVERTER_LOADING_DATA', payload: true });
        const currencyData = await convertCurrency({
          amount: numericAmount,
          from,
          to,
        });

        dispatch({
          type: 'CURRENCY_CONVERTING',
          payload: {
            result: currencyData.result,
            rate: currencyData.rate,
            cacheKey: cacheKey,
          },
        });
        dispatch({ type: 'ADD_CONVERTER_LOADING_DATA', payload: false });
        dispatch({ type: 'SET_CONVERTER_CACHED_STATUS', payload: false });
      }
    } catch (error) {
      handleError(error);
      dispatch({ type: 'ADD_CONVERTER_LOADING_DATA', payload: false });
    }
  }, [stateConverter, dispatch, handleError]);

  useEffect(() => {
    let timer;
    if (stateConverter.isConverterCashed) {
      timer = setTimeout(() => {
        dispatch({ type: 'SET_CONVERTER_CACHED_STATUS', payload: false });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [stateConverter.isConverterCashed, dispatch]);

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
