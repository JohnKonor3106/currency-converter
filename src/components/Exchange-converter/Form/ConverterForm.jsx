import React, { useContext, memo, useEffect, useState } from 'react'; // Импортируем useState
import { Form } from 'react-bootstrap';
import { ContextExchangeConverter } from '../../../Providers/ProviderExchangeConverter';
import ExchangeButton from '../Button/ExchangeButton';
import CurrencySelect from '../Select/CurrencySelect';
import ConvertDisplay from '../Display/ResultDisplay';
import ExchangeButtonReverse from '../Button/ExchangeButtonReverse';

const ConverterForm = memo(() => {
  const {
    converter,
    setAmount,
    setValueCurrencyFrom,
    setValueCurrencyTo,
    handleClickReverse,
    handleConvert,
  } = useContext(ContextExchangeConverter);

  const [amountBorderStyle, setAmountBorderStyle] = useState('');
  const [fromBorderStyle, setFromBorderStyle] = useState('');
  const [toBorderStyle, setToBorderStyle] = useState('');

  const notificationLoadingCache = // Исправил опечатку "Loafing" на "Loading"
    (
      <p className='text-center text-muted'>
        данные будут загружены из внешнего источника
      </p>
    );
  const fixedNotification = (
    <p className='text-center text-muted'>
      данные кэшированы внутри приложения и могут стать неактуальными
    </p>
  );

  useEffect(() => {
    const { localErrors } = converter;
    console.log('Локальные ошибки в ConverterForm:', localErrors);

    setAmountBorderStyle('');
    setFromBorderStyle('');
    setToBorderStyle('');

    if (localErrors.amount) {
      setAmountBorderStyle('border border-danger');
    }
    if (localErrors.from) {
      setFromBorderStyle('border border-danger');
    }
    if (localErrors.to) {
      setToBorderStyle('border border-danger');
    }

    // Опционально: можно сфокусироваться на первом ошибочном поле
    // if (localErrors.amount && amountInputRef.current) {
    //   amountInputRef.current.focus();
    // } else if (localErrors.from && fromSelectRef.current) {
    //   fromSelectRef.current.focus();
    // } else if (localErrors.to && toSelectRef.current) {
    //   toSelectRef.current.focus();
    // }
  }, [converter.localErrors]);

  return (
    <>
      <Form className='w-50 m-auto mt-5 p-4 border rounded shadow-sm'>
        <Form.Group controlId='currencyFormGroup'>
          <Form.Label className='text-center d-block'>Convert From</Form.Label>
          <CurrencySelect
            handleChange={setValueCurrencyFrom}
            value={converter.from}
            options={converter.list}
            className={fromBorderStyle} // Добавляем сюда класс ошибки
          />

          {converter.localErrors.from && (
            <p className='text-danger text-center mb-1'>
              {converter.localErrors.from}
            </p>
          )}

          <ExchangeButtonReverse onClick={handleClickReverse} />

          <Form.Label className='text-center d-block'> Convert To </Form.Label>
          <CurrencySelect
            handleChange={setValueCurrencyTo}
            value={converter.to}
            options={converter.list}
            className={toBorderStyle}
          />
          {converter.localErrors.to && (
            <p className='text-danger text-center mb-3'>
              {converter.localErrors.to}
            </p>
          )}

          <Form.Label className='text-center d-block'> Amount </Form.Label>
          <Form.Control
            className={`w-25 mx-auto mb-3 ${amountBorderStyle}`}
            type='number'
            placeholder=' Input amount'
            size='lg'
            value={converter.amount}
            onChange={setAmount}
          ></Form.Control>

          {converter.localErrors.amount && (
            <p className='text-danger text-center mb-1'>
              {converter.localErrors.amount}
            </p>
          )}
        </Form.Group>

        <div className='d-grid gap-2'>
          <ConvertDisplay />
          <ExchangeButton
            onClick={handleConvert}
            text={'Convert'}
            isLoading={converter.loading}
          />
        </div>
        {converter.loading && notificationLoadingCache}
        {converter.isConverterCashed && fixedNotification}
      </Form>
    </>
  );
});

export default ConverterForm;
