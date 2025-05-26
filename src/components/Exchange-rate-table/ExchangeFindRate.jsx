import Form from 'react-bootstrap/Form';
import { ContextExchangeRate } from '../../Providers/ProviderExchangeRate';
import { useContext } from 'react';

const ExchangeFindRate = () => {
  const { handleFindRate, tern } = useContext(ContextExchangeRate);
  return (
    <Form.Control
      size='lg'
      type='text'
      value={tern}
      placeholder='Сurrency search '
      onChange={handleFindRate}
    />
  );
};

export default ExchangeFindRate;
