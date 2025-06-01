// src/Utils/validateInputsChart.js
const validateInputsChart = (from, to, dispatch) => {
  const errors = {};
  if (!from) {
    errors.from = 'Пожалуйста, выберите исходную валюту.';
  }
  if (!to) {
    errors.to = 'Пожалуйста, выберите целевую валюту.';
  }

  dispatch({ type: 'CLEAR_LOCAL_ERRORS' });
};

export default validateInputsChart;
