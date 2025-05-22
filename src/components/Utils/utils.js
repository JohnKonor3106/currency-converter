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

export default errorHandling;
