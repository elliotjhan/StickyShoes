import React from 'react';
import './../styles/quantity.css';

const Quantity = (props) => {
  return (
    <div className="quantity-input">
      <button className="quantity-input__modifier quantity-input__modifier--left" onClick={() => props.decrement()}>
        &mdash;
      </button>
      <input className="quantity-input__screen" type="text" value={props.quantity} readOnly />
      <button className="quantity-input__modifier quantity-input__modifier--right" onClick={() => props.increment()}>
        &#xff0b;
      </button>
    </div>
  );
}

export default Quantity;
