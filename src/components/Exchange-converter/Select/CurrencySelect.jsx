import React from 'react';
import { memo } from 'react';
import { Form } from 'react-bootstrap';

const CurrencySelect = memo(({ options, handleChange, value, className }) => {
  return (
    <Form.Select
      onChange={handleChange}
      aria-label='select-currency'
      size='lg'
      className={className || 'mb-5'}
      value={value}
    >
      <option value=''>Выберите валюту...</option>
      {options.map(({ code, id }) => (
        <option key={id} value={code}>
          {code}
        </option>
      ))}
    </Form.Select>
  );
});

export default CurrencySelect;
