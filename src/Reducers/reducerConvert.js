const reducerConvert = (draft, action) => {
  switch (action.type) {
    case 'ADD_CURRENCY_FROM':
      draft.from = action.payload;
      break;
    case 'ADD_CURRENCY_TO':
      draft.to = action.payload;
      break;
    case 'ADD_CURRENCY_AMOUNT':
      draft.amount = action.payload;
      break;
    case 'REVERSE_CURRENCY':
      const temp = draft.from;
      console.log(temp);
      draft.from = draft.to;
      draft.to = temp;
      break;
    case 'CURRENCY_CONVERTING':
      draft.result = action.payload;
      break;
    case 'ADD_CONVERTER_LOADING_DATA':
      draft.loading = action.payload;
      break;
    default:
      return draft;
  }
};

export default reducerConvert;
