import React from 'react';

export const Footer = () => {
  return (
    <footer
      style={{
        flexShrink: 0,
        backgroundColor: '#00a04f', // зелёный фон
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '1rem',
      }}
    >
      <div>My food 🩷</div>
      <div>Хомутова Валерия</div>
    </footer>
  );
};