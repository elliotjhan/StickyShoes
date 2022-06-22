import React from 'react';

class Quantity extends React.Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.props.increment();
  }

  decrement() {
    this.props.decrement();
  }

  render() {
    return (
      <div className="quantity-input mb-3">
        <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>
                &mdash;
        </button>
        <input className="quantity-input__screen" type="text" value={this.props.quantity} readOnly />
        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>
                &#xff0b;
        </button>
      </div>

    );
  }
}

export default Quantity;
