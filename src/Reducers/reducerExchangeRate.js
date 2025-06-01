const reducerExchangeRate = (draft, action) => {
  switch (action.type) {
    case 'ADD_BASE_CODE_CURRENCY':
      draft.basicCode = action.payload;
      draft.localErrors = {};
      break;
    case 'ADD_VALUE_TERN':
      draft.tern = action.payload;
      break;
    case 'ADD_CASHED_EXCHANGE_RATE': // Если этот флаг (isCashed) больше не используется в UI, его можно удалить.
      // В контексте React Query, isCashed может быть излишним.
      draft.isCashed = action.payload;
      break;
    case 'FIND_CURRENCY':
      const { tern } = action.payload;

      const sourceRatesForSearch = draft.currentExchangeRate;

      if (!sourceRatesForSearch || !sourceRatesForSearch.conversionRates) {
        draft.currentExchangeRate = { conversionRates: [] };
        return;
      }

      if (tern.length === 0) {
        draft.currentExchangeRate = draft.fullExchangeRateData;
      } else {
        const filteredRates =
          sourceRatesForSearch.conversionRates?.filter(([code]) =>
            code.includes(tern.toUpperCase())
          ) || [];

        draft.currentExchangeRate = {
          ...sourceRatesForSearch,
          conversionRates: filteredRates,
        };
      }
      break;
    case 'ADD_EXCHANGE_RATE_DATA':
      // Это действие диспатчится из провайдера, когда useQuery успешно получает данные
      // (которые уже обработаны getDinamicRiseCurrency и содержат динамику).
      draft.currentExchangeRate = action.payload;
      draft.fullExchangeRateData = action.payload;
      break;
    case 'SET_TABLE_RATE_ERROR':
      draft.localErrors[action.payload.type] = action.payload.description;
      break;
    case 'LOADING_DATA':
      draft.loading = action.payload;
      break;
    default:
      return draft;
  }
};

export default reducerExchangeRate;
