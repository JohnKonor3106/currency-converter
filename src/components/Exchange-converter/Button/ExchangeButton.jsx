import { Button, Spinner } from 'react-bootstrap';
import React from 'react';

const ExchangeButton = React.memo(({ onClick, text, style, isLoading }) => {
  return (
    <Button
      variant='primary'
      size='lg'
      onClick={onClick} // Просто вызываем переданную функцию
      className={style}
      disabled={isLoading}
    >
      {isLoading ? <Spinner animation='border' variant='success' /> : `${text}`}
    </Button>
  );
});

export default ExchangeButton;
