const reducerExchangeTabs = (draft, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB':
      draft.active = action.payload;
      break;
    default:
      return draft;
  }
};

export default reducerExchangeTabs;
