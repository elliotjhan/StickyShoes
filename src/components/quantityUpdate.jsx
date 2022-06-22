import React from 'react';

class QuantityUpdate extends React.Component {

  render() {
    return (
      <div className="quantity-input mb-3">
        <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.props.decrement} >
                &mdash;
        </button>
        <input className="quantity-input__screen" type="text" value={this.props.quantity} readOnly />
        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.props.increment} >
                &#xff0b;
        </button>
      </div>

    );
  }
}

export default QuantityUpdate;
