import axios from 'axios';

const getExchangeChart = async (from, to) => {
  const apiKey = import.meta.env.VITE_API_KEY_ALPHA;

  try {
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${from}&to_symbol=${to}&apikey=${apiKey}`
    );
    console.log(response.data);
    if (response.status === 200) {
      // Пример преобразования данных для графика
      const timeSeries = response.data['Time Series FX (Weekly)'];
      if (!timeSeries) {
        throw new Error('No time series data found in Alpha Vantage response.');
      }
      const chartData = Object.entries(timeSeries)
        .map(([date, dailyRates]) => ({
          date: date,
          value: parseFloat(dailyRates['4. close']),
        }))
        .reverse();
      return chartData;
    } else if (response.status !== 200) {
      console.log(`Status: ${response.status}`);
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Проверка на ошибку Axios
      if (error.response) {
        // Ошибка получена с сервера (статус 4xx/5xx)
        const apiErrorType = error.response.data;
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

export default getExchangeChart;
