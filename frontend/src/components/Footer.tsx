import React from 'react';

export const Footer = () => {
  return (
    <footer
      style={{
        flexShrink: 0,
        backgroundColor: '#ffbc80',
        color: '#4a2c00',
        padding: '1rem 2rem',
        textAlign: 'center',
        boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '0.9rem',
      }}
    >
      <div style={{ margin: '0.3rem 0' }}>Контакты:</div>
      <div style={{ margin: '0.3rem 0' }}>
        email: klucenkoem2@gmail.com | тел: +7 (912) 826-28-38
      </div>
      <div style={{ margin: '0.3rem 0' }}>© 2025 Bloom</div>
    </footer>
  );
};
