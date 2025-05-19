import { useState } from 'react';
import ConverterForm from './components/Form/ConverterForm';
import ConvertDisplay from './components/Display/ResultDisplay';
import { ConvertContext } from './components/StateApp/stateApp';
import { uniqueId } from 'lodash'; // Используется только при инициализации

function App() {
  const [currency, setCurrency] = useState({
    amount: '',
    currency: {
      // Вложенность 'currency.currency' все еще может быть упрощена
      list: [
        // Этот список используется как статический, но с уникальными ID
        { code: 'USD', id: uniqueId() },
        { code: 'RUB', id: uniqueId() },
        { code: 'EUR', id: uniqueId() }, // Добавим для примера
      ],
      from: '',
      to: '',
    },
    result: null,
    loading: false,
    error: null,
  });

  // Правильно используете prevSate для обновления вложенного состояния
  const setValueCurrencyFrom = e => {
    setCurrency(prevState => ({
      ...prevState,
      currency: {
        // Необходимо обновить вложенный объект 'currency'
        ...prevState.currency,
        from: e.target.value,
      },
    }));
  };

  const setValueCurrencyTo = e => {
    setCurrency(prevState => ({
      ...prevState,
      currency: {
        // Необходимо обновить вложенный объект 'currency'
        ...prevState.currency,
        to: e.target.value,
      },
    }));
  };

  // Функция для обновления поля "amount"
  const setAmount = e => {
    setCurrency(prevState => ({
      ...prevState,
      amount: e.target.value,
    }));
  };

  return (
    <>
      <ConvertContext.Provider
        value={{
          currentCurrency: currency,
          // setCurrency: setCurrency, // Обычно не передают сам setCurrency в контекст, а только функции-обработчики
          setValueCurrencyFrom: setValueCurrencyFrom,
          setValueCurrencyTo: setValueCurrencyTo,
          setAmount: setAmount, // Передаем функцию для обновления amount
        }}
      >
        <ConverterForm />
        <ConvertDisplay />
      </ConvertContext.Provider>
    </>
  );
}

export default App;
