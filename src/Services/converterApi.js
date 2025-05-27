import axios from 'axios';
import errorHandling from '../Utils/utils';

const convertCurrency = async ({ from, to, amount }) => {
  if (!from || !to || !amount || amount <= 0) {
    throw new Error('Не указаны все параметры или сумма некорректна');
  }

  const apiKey = import.meta.env.VITE_API_KEY_EXCHANGE;

  if (!apiKey) {
    throw new Error('API-ключ не найден. Проверьте .env (VITE_API_KEY).');
  }

  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`
    );

    if (response.data.result === 'success') {
      return {
        result: response.data.conversion_result,
        rate: response.data.conversion_rate,
      };
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

export default convertCurrency;
