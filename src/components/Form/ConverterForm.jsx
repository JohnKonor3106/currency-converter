import React from 'react';
import { useContext } from 'react';
import { ConvertContext } from '../StateApp/stateApp';
import { Form } from 'react-bootstrap';
import ConvertButton from '../Button/ConvertButton';
import CurrencySelect from '../Select/CurrencySelect';

const ConverterForm = () => {
  const {
    setValueCurrencyFrom,
    setValueCurrencyTo,
    setAmount, // Получаем функцию для обновления amount
    currentCurrency,
  } = useContext(ConvertContext);

  return (
    <Form className='w-50 m-auto mt-5 p-4 border rounded shadow-sm'>
      <Form.Group controlId='currencyInputGroup' className='mb-3'>
        {' '}
        <Form.Label className='text-center d-block'> Convert From </Form.Label>
        <CurrencySelect
          handleChange={setValueCurrencyFrom}
          value={currentCurrency.currency.from} // Текущее выбранное значение
          options={currentCurrency.currency.list} // Передаем список опций из App.js
        />
        <Form.Label className='text-center d-block'> Convert To </Form.Label>{' '}
        <CurrencySelect
          handleChange={setValueCurrencyTo}
          value={currentCurrency.currency.to} // Текущее выбранное значение
          options={currentCurrency.currency.list} // Передаем список опций из App.js
        />
        {/* Улучшил controlId */}
        {/* Поле для ввода суммы */}
        <Form.Label className='text-center d-block'> Amount </Form.Label>{' '}
        {/* Перенес метку */}
        <Form.Control
          className='w-25 mx-auto mb-3' // Добавил margin-bottom
          type='text'
          placeholder=' Input currency'
          size='lg'
          value={currentCurrency.amount} // Связываем с состоянием amount
          onChange={setAmount} // Добавляем обработчик изменения
        ></Form.Control>{' '}
      </Form.Group>

      <div className='d-grid gap-2'>
        <ConvertButton />
      </div>
    </Form>
  );
};

export default ConverterForm;
