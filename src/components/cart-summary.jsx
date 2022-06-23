import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Link } from 'react-router-dom'; 

const CartSummary = (props) => {
  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getCartTotal = () => {
    let cartTotal = 0;
    props.cartData.forEach(element => {
      cartTotal += parseFloat(element.price * element.count);
    });
    return numberWithCommas(cartTotal);
  }

  const getCartLength = () => {
    let cartLength = 0;
    props.cart.forEach(element => {
      cartLength += parseFloat(element.count);
    });
    return cartLength;
  }

  let cartItemArray = props.cartData;
  let cartItemArrayDisplay = null;
  if (cartItemArray.length !== 0) {
    cartItemArrayDisplay = cartItemArray.map(element => {
      return <CartSummaryItem
        updateCart={props.updateCart}
        getCartItems={props.getCartItems}
        count={element.count}
        deleteFromCart={props.deleteFromCart}
        className="row" key={element.id}
        product={element} />;
    });
  }

  if (cartItemArrayDisplay !== null) {
    return (
      <div className="container cartContainer">
        <Link to={'/catalog'}>
          <div className="cursor row text-dark">&lt;Back to Catalog</div><br/>
        </Link>
        <div className="display-4 row">
          <div className="col cartSummary">Cart Summary:</div>
        </div>
        <div>
          {cartItemArrayDisplay}
        </div>
        <div className="row align-items-center">
          <div className="col text-left mt-3 cartSubtotal">Subtotal ({getCartLength()} items): {getCartTotal()}</div>
          <div className="col text-right ">
            <Link to={'/catalog'}>
              <button className="btn btn-info mr-2 cartShoppingButton">Keep Shopping</button>
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
