import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ContextExchangeChart } from '../../Providers/ProviderExchangeChart';
import { useContext } from 'react';

const ExchangeDropDown = React.memo(() => {
  const { setExchangeChartPeriod, exchangeChart } =
    useContext(ContextExchangeChart);
  const { historicalChart } = exchangeChart;
  return (
    <DropdownButton
      drop='start'
      id='dropdown-basic-button'
      title={historicalChart.currentPeriod}
      size='lg'
      className='mb-5'
      onSelect={e => setExchangeChartPeriod(e)}
    >
      <Dropdown.Item eventKey='Week'>Week</Dropdown.Item>
      <Dropdown.Item eventKey='Month'>Month</Dropdown.Item>
      <Dropdown.Item eventKey='Year'>Year</Dropdown.Item>
      <Dropdown.Item eventKey='All'>All time</Dropdown.Item>
    </DropdownButton>
  );
});

export default ExchangeDropDown;
