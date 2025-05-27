const errorHandling = errors => {
  let errorMessage;

  if (errors) {
    switch (errorType) {
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
      default:
        errorMessage = `Ошибка API: ${errorType}`;
    }
  }

  return errorMessage;
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
  const limitDate = new Date();

  limitDate.setDate(today.getDate() - daysLimit);

  const startIndex = allHistoricalData.findIndex(item => {
    return new Date(item.date).getTime() >= limitDate.getTime();
  });

  if (startIndex === -1) {
    return allHistoricalData.length > 0
      ? [allHistoricalData[allHistoricalData.length - 1]]
      : [];
  }
  return allHistoricalData.slice(startIndex);
};

export default errorHandling;
