import React from 'react';

export default function Button({
  children,
  selected,
  onClick,
  mainColor = 'blue',
}) {
  function handleClick() {
    onClick(children);
  }

  const { buttonStyle } = styles;

  let classNames = `waves-effect waves-light btn darken-4`;
  classNames += selected ? ` black` : ` ${mainColor}`;

  return (
    <button className={classNames} style={buttonStyle} onClick={handleClick}>
      {children}
    </button>
  );
}

const styles = {
  buttonStyle: {
    margin: '10px',
    textAlign: 'center',
  },
};
