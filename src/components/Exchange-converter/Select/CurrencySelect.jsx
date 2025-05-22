import React from 'react';
import { Form } from 'react-bootstrap';

const CurrencySelect = ({ options, handleChange, value }) => {
  return (
    <Form.Select
      onChange={handleChange} // Передаем прямо переданный handleChange
      aria-label='select-currency'
      size='lg'
      className='mb-5'
      value={value} // <- ЭТО КРИТИЧНО: value селекта должно быть текущим выбранным значением из состояния
    >
      {/* Добавляем опцию-плейсхолдер */}
      <option value=''>Выберите валюту...</option>
      {/* Рендерим опции, переданные через пропсы */}
      {options.map(({ code, id }) => (
        <option key={id} value={code}>
          {' '}
          {code}
        </option>
      ))}
    </Form.Select>
  );
};

export default CurrencySelect;
