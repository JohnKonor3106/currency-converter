import React from 'react';
import { Table } from 'react-bootstrap';
import ExchangeButton from '../Exchange-converter/Button/ExchangeButton';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';
import { ContextExchangeRate } from '../../Providers/ProviderExchangeRate';
import { useContext } from 'react';

const generateTableRows = data => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
  return data.map(([currencyCode, rate]) => (
    <tr key={currencyCode}>
      <td>{currencyCode}</td>
      <td>{rate}</td>
    </tr>
  ));
};

const ExchangeTable = () => {
  const { exchangeRate, setBasicCode, handleConversionRates } =
    useContext(ContextExchangeRate);
  const { currencyExchangeRate } = exchangeRate;

  return (
    <div className='d-block w-50 mx-auto mt-5'>
      <CurrencySelect
        options={exchangeRate.list}
        value={exchangeRate.basicCode}
        handleChange={setBasicCode}
      />
      {!currencyExchangeRate ? (
        <div className='mt-5 mb-5 text-center'> НЕТ ДАННЫХ </div>
      ) : (
        <>
          <Table striped bordered hover size='lg' className='m-0 auto mt-5'>
            <caption>
              курс валют на момент: {currencyExchangeRate.timeLastUpdateUtc}
            </caption>
            <thead>
              <tr>
                <th>Валюта</th>
                <th>Курс</th>
              </tr>
            </thead>
          </Table>
          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              borderLeft: '1px solid #dee2e6',
              borderRight: '1px solid #dee2e6',
            }}
            className='m-0 auto'
          >
            <Table striped bordered hover size='lg' className='m-0 auto'>
              <tbody>
                {generateTableRows(currencyExchangeRate.conversionRates)}
              </tbody>
            </Table>
          </div>
        </>
      )}
      <ExchangeButton
        onClick={handleConversionRates}
        text={'Exchange Rate'}
        style={'d-block w-50 mx-auto text-center mt-5 mb-5'}
      />
    </div>
  );
};

export default ExchangeTable;
