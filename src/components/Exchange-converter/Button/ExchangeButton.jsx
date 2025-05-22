import { Button } from 'react-bootstrap';

const ExchangeButton = ({ onClick, text }) => {
  return (
    <Button
      variant='primary'
      size='lg'
      onClick={onClick} // Просто вызываем переданную функцию
    >
      {text}
    </Button>
  );
};

export default ExchangeButton;
