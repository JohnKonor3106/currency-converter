import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FixedSizeList } from 'react-window';
import ExchangeButton from '../Exchange-converter/Button/ExchangeButton';
import CurrencySelect from '../Exchange-converter/Select/CurrencySelect';
import { ContextExchangeRate } from '../../Providers/ProviderExchangeRate';
import ExchangeFindRate from './ExchangeFindRate';

const Row = memo(({ index, style, data, isScrolling }) => {
  const [code, value, dinamic_rate] = data[index];
  const isOddRow = index % 2 !== 0;
  const rowClass = isOddRow ? 'bg-dark-subtle' : '';
  let dinamic_img;
  console.log(dinamic_rate);

  switch (dinamic_rate) {
    case 'currency_rise':
      dinamic_img = '/top.png';
      break;
    case 'currency_fall':
      dinamic_img = '/down.png';
      break;
    case 'no_change':
      break;
    default:
      dinamic_img = null;
  }

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
        {dinamic_img && (
          <img
            src={dinamic_img}
            alt={dynamicStatus}
            style={{ marginLeft: '5px', height: '16px' }}
          />
        )}
      </div>
    </div>
  );
});

const ExchangeTable = memo(() => {
  const { exchangeRate, setBasicCode } = useContext(ContextExchangeRate);

  const [borderInputTableRate, setBorderInputTableRate] = useState('');

  const { currentExchangeRate } = exchangeRate;

  const tableData = useMemo(() => {
    if (!currentExchangeRate || !currentExchangeRate.conversionRates) {
      return [];
    }

    return currentExchangeRate.conversionRates;
  }, [currentExchangeRate]);

  useEffect(() => {
    const { localErrors } = exchangeRate;
    setBorderInputTableRate('');
    if (localErrors.currency_rate) {
      setBorderInputTableRate('border border-danger');
    }
  }, [exchangeRate.localErrors]);

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
        className={borderInputTableRate}
      />

      {exchangeRate.localErrors && (
        <p className='text-danger text-center mb-1'>
          {exchangeRate.localErrors.currency_rate}
        </p>
      )}

      <ExchangeFindRate />
      {!currentExchangeRate ||
      !currentExchangeRate.conversionRates ||
      tableData.length === 0 ? (
        <div className='mt-5 mb-5 text-center'> НЕТ ДАННЫХ </div>
      ) : (
        <>
          <Table bordered hover size='lg' className='m-0 auto mt-5'>
            <caption>
              {exchangeRate.isCashed
                ? 'data is cached until the page reloads'
                : `exchange rate at the time:: ${currentExchangeRate.timeLastUpdateUtc}`}
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
      {/* <ExchangeButton
        onClick={handleConversionRates}
        text={'Exchange Rate'}
        style={'d-block w-50 mx-auto text-center mt-5 mb-1'}
        isLoading={exchangeRate.loadom}
      /> */}
    </div>
  );
});

export default ExchangeTable;
