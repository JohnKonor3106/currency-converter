const errorHandling = error => {
  let errorMessage;

  if (error) {
    switch (error.message) {
      case 'unsupported-code':
        errorMessage = 'Неподдерживаемый код валюты.';
        break;
      case 'malformed-request':
        errorMessage = 'Некорректный запрос.';
        break;
      case 'invalid-key':
        errorMessage = 'Недействительный API-ключ.';
        break;
      case 'inactive-account':
        errorMessage = 'Аккаунт неактивен.';
        break;
      case 'quota-reached':
        errorMessage = 'Превышена квота запросов к API.';
        break;
      case 'Ошибка при конвертации валюты':
        errorMessage = 'Пожалуйста, заполните все поля.';
        break;
      default:
        errorMessage = `Ошибка API: ${error.message || 'Неизвестная ошибка'}`;
    }
  } else {
    errorMessage = 'Неизвестная ошибка';
  }

  return { message: errorMessage, originalError: error };
};

export const getChartDataByPeriod = (allHistoricalData, period) => {
  let daysLimit;
  switch (period) {
    case 'Week':
      daysLimit = 7;
      break;
    case 'Month':
      daysLimit = 30;
      break;
    case 'Year':
      daysLimit = 365;
      break;
    case 'All':
      return allHistoricalData;
    default:
      return [];
  }

  const today = new Date();
  const limitDate = new Date(today);

  limitDate.setDate(today.getDate() - daysLimit);
  limitDate.setHours(0, 0, 0, 0);

  const startIndex = allHistoricalData.findIndex(item => {
    return new Date(item.date).getTime() >= limitDate.getTime();
  });

  if (startIndex === -1) {
    return [];
  }
  return allHistoricalData.slice(startIndex);
};

export default errorHandling;
