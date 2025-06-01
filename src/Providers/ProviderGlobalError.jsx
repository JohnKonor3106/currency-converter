import { useImmerReducer } from 'use-immer';
import React from 'react';
import reducerGlobalError from '../Reducers/reducerGlobalError';
import { useCallback, useMemo } from 'react';

export const ContextGlobalError = React.createContext({});

const initState = {
  errors: [],
};

const ProviderGlobalError = ({ children }) => {
  const [errors, dispatch] = useImmerReducer(reducerGlobalError, initState);

  const handleError = useCallback(
    err => {
      dispatch({ type: 'ERROR_HEADING', payload: err });
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  const valueError = useMemo(
    () => ({
      errors,
      handleError: handleError,
      handleClearError: handleClearError,
    }),
    [errors, handleError, handleClearError]
  );

  return (
    <ContextGlobalError.Provider value={valueError}>
      {children}
    </ContextGlobalError.Provider>
  );
};

export default ProviderGlobalError;
