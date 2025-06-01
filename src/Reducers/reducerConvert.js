// reducerConvert.js
const reducerConvert = (draft, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY_AMOUNT':
      draft.amount = action.payload;
      if (draft.localErrors.amount) {
        delete draft.localErrors.amount;
      }
      break;
    case 'ADD_CURRENCY_FROM':
      draft.from = action.payload;
      if (draft.localErrors.from) {
        delete draft.localErrors.from;
      }
      break;
    case 'ADD_CURRENCY_TO':
      draft.to = action.payload;
      if (draft.localErrors.to) {
        delete draft.localErrors.to;
      }
      break;
    case 'REVERSE_CURRENCY':
      [draft.from, draft.to] = [draft.to, draft.from];
      draft.localErrors = {};
      break;
    case 'CURRENCY_CONVERTING':
      draft.result = action.payload.result;
      if (!draft.cachedDataCurrency[action.payload.cacheKey]) {
        draft.cachedDataCurrency[action.payload.cacheKey] = {
          rate: action.payload.rate,
          timestamp: Date.now(),
        };
      }
      draft.localErrors = {};
      break;
    case 'ADD_CONVERTER_LOADING_DATA':
      draft.loading = action.payload;
      break;
    case 'SET_CONVERTER_CACHED_STATUS':
      draft.isConverterCashed = action.payload;
      break;
    case 'SET_ERROR':
      draft.localErrors[action.payload.type] = action.payload.description;
      break;
    case 'SET_MULTIPLE_ERRORS':
      draft.localErrors = action.payload;
      break;
    case 'CLEAR_LOCAL_ERRORS':
      draft.localErrors = {};
      break;
    default:
      return draft;
  }
};

export default reducerConvert;
