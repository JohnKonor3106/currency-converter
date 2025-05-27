const reducerExchangeRate = (draft, action) => {
  switch (action.type) {
    case 'ADD_BASE_CODE_CURRENCY':
      draft.basicCode = action.payload;
      break;
    case 'ADD_VALUE_TERN':
      draft.tern = action.payload;
      console.log(draft.tern);
      break;
    case 'FIND_CURRENCY':
      const { tern } = action.payload;

      if (!draft.initCurrencyExchangeRate) return;

      if (tern.length === 0) {
        draft.currencyExchangeRate.conversionRates =
          draft.initCurrencyExchangeRate;
      } else {
        draft.currencyExchangeRate.conversionRates =
          draft.initCurrencyExchangeRate.filter(([code]) =>
            code.includes(tern.toUpperCase())
          );
      }
      break;
    case 'ADD_EXCHANGE_RATE_DATA':
      draft.currencyExchangeRate = action.payload;
      draft.initCurrencyExchangeRate = action.payload.conversionRates;
      break;
    default:
      return draft;
  }
};

export default reducerExchangeRate;
