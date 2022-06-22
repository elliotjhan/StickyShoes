import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getCartTotal() {
    let cartTotal = null;
    this.props.cart.forEach(element => {
      cartTotal += parseFloat(element.price * element.count);
    });
    return this.numberWithCommas(cartTotal);
  }

  getCartLength() {
    let cartLength = null;
    this.props.cart.forEach(element => {
      cartLength += parseFloat(element.count);
    });
    return cartLength;
  }

  setViewCallback() { // callback function that toggles what the mainpage will display.
    let callback = this.props.setView;
    let catalog = 'catalog'; // putting in catalog will make the react render back to main page which is catalog
    let params = {};
    callback(catalog, params);
  }

  setViewCheckout() {
    let callback = this.props.setView;
    let checkout = 'checkout'; // callback function to set the page to the checkout page
    let params = {};
    callback(checkout, params);
  }

  render() {
    let cartItemArray = this.props.cart;
    let cartItemArrayDisplay = null;
    if (cartItemArray.length !== 0) {
      cartItemArrayDisplay = cartItemArray.map(element => {
        return <CartSummaryItem
          updateCart={this.props.updateCart}
          getCartItems={this.props.getCartItems}
          count={element.count}
          deleteFromCart={this.props.deleteFromCart}
          className="row" key={element.id}
          product={element} />;
      });
    }

    if (cartItemArrayDisplay !== null) {
      return (
        <div className="container cartContainer">
          <div onClick={this.setViewCallback.bind(this)} className="cursor row text-dark">&lt;Back to Catalog</div><br/>
          <div className="display-4 row">
            <div className="col cartSummary">Cart Summary:</div>
          </div>
          <div>
            {cartItemArrayDisplay}
          </div>
          <div className="row align-items-center">
            <div className="col text-left mt-3 cartSubtotal">Subtotal ({this.getCartLength()} items): ${this.getCartTotal()}</div>
            <div className="col text-right ">
              <button onClick={this.setViewCallback.bind(this)} className="btn btn-info mr-2 cartShoppingButton">Keep Shopping</button>
              <button onClick={this.setViewCheckout.bind(this)} className="btn btn-primary cartCheckoutButton">Checkout</button>
            </div>
          </div>
          <br/>
        </div>

      );
    } else {
      return (
        <div className="container">
          <div onClick={this.setViewCallback.bind(this)} className="cursor row text-secondary">&lt;Back to Catalog</div><br/>
          <div className="row display-4">Cart Is Empty</div>
        </div>
      );
    }

  }

}

export default CartSummary;
