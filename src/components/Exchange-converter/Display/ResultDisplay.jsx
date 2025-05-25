import React, { useContext } from 'react';
import { ContextExchangeConverter } from '../../../Providers/ProviderExchangeConverter';

const baseResultStyle = {
  width: '300px',
  height: '100px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  margin: '20px auto',
  pading: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const ConvertDisplay = () => {
  const { converter } = useContext(ContextExchangeConverter);
  const { result, loading, error } = converter;

  let content;
  let dynamicColor = baseResultStyle.color || '#333'; // Цвет по умолчанию

  if (loading) {
    content = 'Конвертация...';
    dynamicColor = '#007bff'; // Синий для загрузки
  } else if (error) {
    content = `Ошибка: ${error.message}`;
    dynamicColor = 'red'; // Красный для ошибки
  } else if (result !== null) {
    content = `Результат: ${result.toFixed(2)}`;
    dynamicColor = '#28a745'; // Зеленый для успеха
  } else {
    content = 'Введите данные для конвертации';
  }

  // Объединяем базовые стили с динамически выбранным цветом
  const currentResultStyle = {
    ...baseResultStyle,
    color: dynamicColor,
  };

  return <div style={currentResultStyle}>{content}</div>;
};

export default ConvertDisplay;
