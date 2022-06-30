import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Link } from 'react-router-dom'; 
import './../styles/cart-summary.css';

const CartSummary = (props) => {
  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getCartTotal = () => {
    let cartTotal = 0;
    props.cartData.forEach(element => {
      cartTotal += parseFloat(element.price * element.quantity);
    });
    return numberWithCommas(cartTotal);
  }

  if (props.cartData && props.cartData.length > 0) {
    let cartItemArray = props.cartData;
    let cartItemArrayDisplay = null;
    cartItemArrayDisplay = cartItemArray.map(element => {
      return (
        <CartSummaryItem
          updateCart={props.updateCart}
          getCartItems={props.getCartItems}
          quantity={element.quantity}
          deleteFromCart={props.deleteFromCart}
          key={element.id}
          product={element} 
        />
      ) 
    });

    return (
      <div className="container cartContainer">
        <Link to={'/catalog'}>
          <div className="cursor row text-secondary pt-2 ps-2">&lt;Back to Catalog</div><br/>
        </Link>
        <div className="row">
          <div className="col cartSummary">Cart Summary:</div>
        </div>
        <div>
          {cartItemArrayDisplay}
        </div>
        <div className="row align-items-center">
          <div className="col cartSubtotal">Subtotal ({props.cartLength} items): ${getCartTotal()}</div>
          <div className="col text-center">
            <Link to={'/catalog'}>
              <button className="btn btn-info cartShoppingButton me-1">Keep Shopping</button>
            </Link>
            <Link to={'/checkout'}>
              <button className="btn btn-primary cartCheckoutButton">Checkout</button>
            </Link>
          </div>
        </div>
        <br/>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Link to={'/catalog'}>
          <div className="cursor row text-secondary">&lt;Back to Catalog</div><br/>  
        </Link>
        <div className="row display-4">Cart Is Empty</div>
      </div>
    );
  }
}

export default CartSummary;
