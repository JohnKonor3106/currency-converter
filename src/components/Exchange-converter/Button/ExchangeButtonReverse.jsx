import { Button } from 'react-bootstrap';
import React from 'react';

const ExchangeButtonReverse = React.memo(({ onClick }) => (
  <Button
    variant='primary'
    size='sm'
    onClick={onClick}
    className='rounded-circle d-block mx-auto text-center mt-5 mb-5'
  >
    <img src='/transfer.png' width={40} height={40} alt='' aria-hidden='true' />
  </Button>
));

export default ExchangeButtonReverse;
