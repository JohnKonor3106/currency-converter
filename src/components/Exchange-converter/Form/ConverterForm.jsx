import React from 'react';
import { useContext } from 'react';
import { ConvertContext } from '../../StateApp/stateApp';
import { Form } from 'react-bootstrap';
import ExchangeButton from '../Button/ExchangeButton';
import CurrencySelect from '../Select/CurrencySelect';

const ConverterForm = () => {
  const {
    setValueCurrencyFrom,
    setValueCurrencyTo,
    setAmount,
    currentCurrency,
    handleConvert,
  } = useContext(ConvertContext);

  return (
    <Form className='w-50 m-auto mt-5 p-4 border rounded shadow-sm'>
      <Form.Group controlId='currencyFormGroup'>
        {' '}
        <Form.Label className='text-center d-block'> Convert From </Form.Label>
        <CurrencySelect
          handleChange={setValueCurrencyFrom}
          value={currentCurrency.converter.from}
          options={currentCurrency.converter.list}
        />
        <Form.Label className='text-center d-block'> Convert To </Form.Label>
        <CurrencySelect
          handleChange={setValueCurrencyTo}
          value={currentCurrency.converter.to}
          options={currentCurrency.converter.list}
        />
        <Form.Label className='text-center d-block'> Amount </Form.Label>
        <Form.Control
          className='w-25 mx-auto mb-3'
          type='number'
          placeholder=' Input amount'
          size='lg'
          value={currentCurrency.converter.amount}
          onChange={setAmount}
        ></Form.Control>
      </Form.Group>

      <div className='d-grid gap-2'>
        <ExchangeButton onClick={handleConvert} text={'Convert'} />
      </div>
    </Form>
  );
};

export default ConverterForm;
