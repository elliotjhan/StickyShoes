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

  const handleCheckout = () => { 
    props.setOrderSummary(props.cartData);
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
      <React.Fragment>
        <div className="row justify-content-center cartSummary">
          <div className="col-10">Cart</div>
        </div>
        {cartItemArrayDisplay}
        <div className="row justify-content-start align-items-center cartFooter">
          <div className="col-1"></div>
          <div className="col-5 cartSubtotal">Subtotal ({props.cartLength} items): ${getCartTotal()}</div>
          <div className="col-2">
            <Link style={{textDecoration: 'none', color: 'black'}} to={'/'}>
              <span className="cursor row keepShopping">&lt;Keep Shopping</span>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link to={'/checkout'}>
              <button onClick={() => handleCheckout()} className="cartCheckoutButton">Checkout</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className="container cartContainer">
        <Link to={'/'}>
          <span className="cursor row keepShopping">&lt;Keep Shopping</span><br/>  
        </Link>
        <div className="row display-4">Cart Is Empty</div>
      </div>
    );
  }
}

export default CartSummary;
