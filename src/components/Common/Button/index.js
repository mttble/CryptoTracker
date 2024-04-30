import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Button({ text, onClick, to, outlined }) {
  const handleClick = () => {
    if (to) {
      window.location.href = to;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={outlined ? "outlined-btn" : "btn"}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  outlined: PropTypes.bool,
};

export default Button;
