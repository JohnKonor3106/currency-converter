import axios from 'axios';
import errorHandling from '../Utils/utils';

const getExchangeRate = async basicCode => {
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${basicCode}`
    );

    if (response.data.result === 'success') {
      const timeLastUpdateUtc = response.data['time_last_update_utc'];
      const conversionRates = Object.entries(response.data['conversion_rates']);
      return { timeLastUpdateUtc, conversionRates };
    } else {
      const errorType = response.data['error-type'];
      let errorMessage = errorHandling(errorType);
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Проверка на ошибку Axios
      if (error.response) {
        // Ошибка получена с сервера (статус 4xx/5xx)
        const apiErrorType =
          error.response.data && error.response.data['error-type'];
        throw new Error(
          `Ошибка сервера: ${apiErrorType || error.message || 'Неизвестная ошибка.'}`
        );
      } else if (error.request) {
        // Запрос был сделан, но ответа не получено (нет сети, CORS)
        throw new Error(
          'Нет ответа от сервера. Проверьте подключение к интернету или CORS.'
        );
      } else {
        // Что-то пошло не так при настройке запроса
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    } else {
      // Другие ошибки, не связанные с Axios (например, ошибки валидации)
      throw new Error(error.message || 'Произошла неизвестная ошибка.');
    }
  }
};

export default getExchangeRate;
