import { Button } from 'react-bootstrap';

const ExchangeButton = ({ onClick, text, style }) => {
  return (
    <Button
      variant='primary'
      size='lg'
      onClick={onClick} // Просто вызываем переданную функцию
      className={style}
    >
      {text}
    </Button>
  );
};

export default ExchangeButton;
