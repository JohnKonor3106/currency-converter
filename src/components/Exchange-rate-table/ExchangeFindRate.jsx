import Form from 'react-bootstrap/Form';
import { ContextExchangeRate } from '../../Providers/ProviderExchangeRate';
import React, { useContext } from 'react';

const ExchangeFindRate = React.memo(() => {
  const { handleFindRate, tern } = useContext(ContextExchangeRate);
  return (
    <Form.Control
      size='lg'
      type='text'
      value={tern}
      placeholder='Сurrency search '
      onChange={handleFindRate}
      className='mt-5'
    />
  );
});

export default ExchangeFindRate;
