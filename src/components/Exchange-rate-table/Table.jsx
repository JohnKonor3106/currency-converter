import React, { memo, useContext, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { FixedSizeList } from 'react-window';
import ExchangeButton from '../Exchange-converter/Button/ExchangeButton';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';
import { ContextExchangeRate } from '../../Providers/ProviderExchangeRate';
import ExchangeFindRate from './ExchangeFindRate';

const Row = memo(({ index, style, data, isScrolling }) => {
  const [_, currency] = data[index];
  const [code, value] = currency.flat();

  const isOddRow = index % 2 !== 0;
  const rowClass = isOddRow ? 'bg-dark-subtle' : '';

  return (
    <div
      style={style}
      className={`d-flex align-items-center border-bottom ${rowClass}`}
    >
      <div className='w-50 pt-2 h-100 text-start px-3 border-end border-black bg-body-tertiary'>
        {code}
      </div>
      <div className='w-50 pt-2 h-100 text-start px-3  bg-body-tertiary'>
        {isScrolling ? 'Loading...' : value}
      </div>
    </div>
  );
});

const ExchangeTable = memo(() => {
  const { exchangeRate, setBasicCode, handleConversionRates } =
    useContext(ContextExchangeRate);
  const { currencyExchangeRate } = exchangeRate;

  const tableData = useMemo(() => {
    if (!currencyExchangeRate) {
      return [];
    }
    return Object.entries(currencyExchangeRate.conversionRates);
  }, [currencyExchangeRate]);

  const rowHeight = 48;
  const maxVisibleRows = 10;
  const dynamicListHeight = Math.min(
    tableData.length * rowHeight,
    maxVisibleRows * rowHeight
  );
  const listHeight = tableData.length > 0 ? dynamicListHeight : 0;

  return (
    <div className='d-block w-50 mx-auto mt-5'>
      <CurrencySelect
        options={exchangeRate.list}
        value={exchangeRate.basicCode}
        handleChange={setBasicCode}
      />
      <ExchangeFindRate />
      {!currencyExchangeRate || tableData.length === 0 ? (
        <div className='mt-5 mb-5 text-center'> НЕТ ДАННЫХ </div>
      ) : (
        <>
          <Table bordered hover size='lg' className='m-0 auto mt-5'>
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

          <FixedSizeList
            height={listHeight}
            itemCount={tableData.length}
            itemSize={rowHeight}
            itemData={tableData}
            width='100%'
            className='m-0 auto border-start border-end border-bottom'
            useIsScrolling={true}
          >
            {Row}
          </FixedSizeList>
        </>
      )}
      <ExchangeButton
        onClick={handleConversionRates}
        text={'Exchange Rate'}
        style={'d-block w-50 mx-auto text-center mt-5 mb-5'}
      />
    </div>
  );
});

export default ExchangeTable;
