import React from 'react';

const Header = () => {
  return (
    <header style={{ 
      padding: '1rem', 
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <h1 style={{
        fontFamily: 'Anton, sans-serif',
        color: 'red',
        textAlign: 'center',
        transform: 'scale(1.2)',
        letterSpacing: '2px'
      }}>EfreiFlix Header</h1>
    </header>
  );
};

export default Header; 