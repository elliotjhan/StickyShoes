import React from 'react';
import './header.css';

const Header = (props) => {
  const handleCartClick = () => {
    props.setView('cart');
    //props.getCartItems();
  }

  return (
    <div className="container-fluid headerContainer">
      <div className="row headerRow">
        <div className="col-lg-8 col-md-8 col-sm-8 text-left mb-3 mt-3 headerTitleContainer">
          <div className="headerTitle display-3">
            <div onClick={() => props.setView('landingPage')} className="headerIcon align-middle mr-3">
            </div>
              Sticky Shoes
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 mt-3 headerCartContainer">
          <div onClick={() => handleCartClick()} className="cursor text-white shoppingCart">
            <div className="cartLength">
              {props.cartLength}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
