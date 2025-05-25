const reducerExchangeChart = (draft, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY_FOR_CHART_FROM':
      draft.currency.from = action.payload;
      break;
    case 'ADD_CURRENCY_FOR_CHART_TO':
      draft.currency.to = action.payload;
      break;
    case 'ADD_EXCHANGE_CHART_DATA':
      draft.exchangeData = action.payload;
      break;
    default:
      return draft;
  }
};

export default reducerExchangeChart;
