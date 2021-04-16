import React from 'react';

export default function ButtonContainer({ children }) {
  const { containerStyle } = styles;

  return <div style={containerStyle}>{children}</div>;
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    flexWrap: 'wrap',
  },
};
