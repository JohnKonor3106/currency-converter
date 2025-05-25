import React from 'react';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { ContextExchangeConverter } from '../../../Providers/ProviderExchangeConverter';
import ExchangeButton from '../Button/ExchangeButton';
import CurrencySelect from '../Select/CurrencySelect';
import ConvertDisplay from '../Display/ResultDisplay';
const ConverterForm = () => {
  const {
    converter,
    setAmount,
    setValueCurrencyFrom,
    setValueCurrencyTo,
    handleConvert,
  } = useContext(ContextExchangeConverter);
  return (
    <Form className='w-50 m-auto mt-5 p-4 border rounded shadow-sm'>
      <Form.Group controlId='currencyFormGroup'>
        {' '}
        <Form.Label className='text-center d-block'> Convert From </Form.Label>
        <CurrencySelect
          handleChange={setValueCurrencyFrom}
          value={converter.from}
          options={converter.list}
        />
        <Form.Label className='text-center d-block'> Convert To </Form.Label>
        <CurrencySelect
          handleChange={setValueCurrencyTo}
          value={converter.to}
          options={converter.list}
        />
        <Form.Label className='text-center d-block'> Amount </Form.Label>
        <Form.Control
          className='w-25 mx-auto mb-3'
          type='number'
          placeholder=' Input amount'
          size='lg'
          value={converter.amount}
          onChange={setAmount}
        ></Form.Control>
      </Form.Group>

      <div className='d-grid gap-2'>
        <ConvertDisplay />
        <ExchangeButton onClick={handleConvert} text={'Convert'} />
      </div>
    </Form>
  );
};

export default ConverterForm;
