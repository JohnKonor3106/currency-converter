const reducerConvert = (draft, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY_FROM':
      const { value: valueCurrencyFrom } = action.payload;
      draft.converter.from = valueCurrencyFrom;
      break;
    case 'ADD_CURRENCY_TO':
      const { value: valueCurrencyTo } = action.payload;
      draft.converter.to = valueCurrencyTo;
      break;
    case 'ADD_CURRENCY_AMOUNT':
      const { value: valueAmount } = action.payload;
      draft.converter.amount = valueAmount;
      break;
    case 'LOADING_DATA':
      const { status } = action.payload;
      draft.converter.loading = status;
      break;
    case 'CURRENCY_CONVERTING':
      draft.converter.result = action.payload;
      break;
    case 'ADD_BASE_CODE_CURRENCY':
      draft.exchangeRate.basicCode = action.payload;
      break;
    case 'ADD_EXCHANGE_RATE_DATA':
      draft.exchangeRate.currencyExchangeRate = action.payload;
      break;
    case 'CHANGE_ACTIVE_TAB':
      draft.tabs.active = action.payload;
      break;
    case 'ERROR_HEADING':
      const { errors } = action.payload;
      draft.errors = errors;
      break;
    default:
      return draft;
  }
};

export default reducerConvert;
