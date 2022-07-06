import React, { useState, useEffect } from 'react';
import QuantityUpdate from './quantityUpdate';
import './../styles/cart-summary-item.css';

const CartSummaryItem = (props) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(props.quantity);
  }, [])

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    if (quantity < 1) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  }

  let product = props.product;
  let imageName = product.image;
  const background = require(`./../assets/images/${imageName}`);
  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="row align-items-center">
      <div className="col-sm-6 productItem" style={style}></div>
      <div className="col-sm-6">
        <div className="cartProductName">{product.name}</div>
        <div className="cartProductPrice">${props.numberWithCommas(product.price)}</div>
        <div className="row align-items-center">
          <div className="col-3">
            <QuantityUpdate increment={increment} decrement={decrement} quantity={quantity}/>
          </div>
          <div className="col">
            <button onClick={() => props.updateCart(quantity, props.product.productid)} className="updateButton">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
