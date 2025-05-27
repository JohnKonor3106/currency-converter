const reducerExchangeChart = (draft, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY_FOR_CHART_FROM':
      draft.currency.from = action.payload;
      break;
    case 'ADD_CURRENCY_FOR_CHART_TO':
      draft.currency.to = action.payload;
      break;
    case 'ADD_EXCHANGE_CHART_PERIOD':
      draft.historicalChart.currentPeriod = action.payload;
      break;
    case 'SET_FULL_CHART_DATA': // <-- НОВОЕ действие
      draft.historicalChart.fixedExchangeChartData = action.payload;
      break;
    case 'SET_DISPLAYED_CHART_DATA': // <-- НОВОЕ действие
      draft.historicalChart.data = action.payload;
      break;
    case 'LOADING_DATA': // <-- ДОБАВЛЕНО, если нет
      draft.loading = action.payload;
      break;
    default:
      return draft;
  }
};
export default reducerExchangeChart;
