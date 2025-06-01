// Отдельная функция валидации
const validateInputsConvert = (from, to, amount, dispatch) => {
  const numericAmount = Number(amount);
  const newErrors = {};
  let hasError = false;

  if (!amount || isNaN(numericAmount)) {
    newErrors.amount = 'пустое поле или некорректное значение';
    hasError = true;
  }
  if (!from) {
    newErrors.from = 'пустое поле';
    hasError = true;
  }
  if (!to) {
    newErrors.to = 'пустое поле';
    hasError = true;
  }

  if (hasError) {
    dispatch({ type: 'SET_MULTIPLE_ERRORS', payload: newErrors });
  }

  return hasError;
};

export default validateInputsConvert;
