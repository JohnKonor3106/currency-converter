const reducerExchangeRate = (draft, action) => {
  switch (action.type) {
    case 'ADD_BASE_CODE_CURRENCY':
      draft.basicCode = action.payload;
      break;
    case 'ADD_EXCHANGE_RATE_DATA':
      draft.currencyExchangeRate = action.payload;
      break;
    default:
      return draft;
  }
};

export default reducerExchangeRate;
