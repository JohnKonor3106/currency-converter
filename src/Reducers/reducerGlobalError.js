const reducerGlobalError = (draft, action) => {
  switch (action.type) {
    case 'ERROR_HEADING':
      draft.errors.push(action.payload);
      break;
    case 'CLEAR_ERROR':
      draft.errors = [];
      break;
    default:
      return draft;
  }
};

export default reducerGlobalError;
