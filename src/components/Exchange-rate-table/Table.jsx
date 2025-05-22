import React from 'react';
import { Table } from 'react-bootstrap';
import ExchangeButton from '../Exchange-converter/Button/ExchangeButton';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';
import { ConvertContext } from '../StateApp/stateApp';
import { useContext } from 'react';

const generatedExchangeRateTable = data => (
  <tbody>
    {data.map(([currencyCode, rate]) => (
      <tr key={currencyCode}>
        <td>{currencyCode}</td>
        <td>{rate}</td>
      </tr>
    ))}
  </tbody>
);

const ExchangeTable = () => {
  const { currentCurrency, setBasicCode, handleConversionRates } =
    useContext(ConvertContext);
  const { exchangeRate } = currentCurrency;
  const { currencyExchangeRate } = exchangeRate;

  return (
    <>
      <CurrencySelect
        options={exchangeRate.list}
        value={exchangeRate.basicCode}
        handleChange={setBasicCode}
      />
      {!currencyExchangeRate ? (
        <div> НЕТ ДАННЫХ </div>
      ) : (
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
          {generatedExchangeRateTable(currencyExchangeRate.conversionRates)}
        </Table>
      )}
      <ExchangeButton onClick={handleConversionRates} text={'Exchange Rate'} />
    </>
  );
};

export default ExchangeTable;
