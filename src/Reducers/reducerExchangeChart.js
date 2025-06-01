const reducerExchangeChart = (draft, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY_FOR_CHART_FROM':
      draft.currency.from = action.payload;
      if (draft.localErrors.from) {
        delete draft.localErrors.from;
      }
      break;
    case 'ADD_CURRENCY_FOR_CHART_TO':
      draft.currency.to = action.payload;
      if (draft.localErrors.to) {
        delete draft.localErrors.to;
      }
      break;
    case 'ADD_EXCHANGE_CHART_PERIOD':
      draft.currentPeriod = action.payload;
      break;
    case 'ADD_EXCHANGE_CHART_DATA':
      draft.currentExchangeRateData = action.payload;
      break;
    case 'SET_LOCAL_ERROR_FROM_VALIDATION':
      draft.localErrors = { ...draft.localErrors, ...action.payload };
      break;
    case 'SET_LOCAL_ERROR_FROM_QUERY':
      draft.localErrors.query = action.payload;
      break;
    case 'CLEAR_LOCAL_ERRORS':
      draft.localErrors = {};
      break;
    default:
      return draft;
  }
};

export default reducerExchangeChart;
