import React from 'react';
import './../styles/header.css';
import { Link } from 'react-router-dom'; 

const Header = (props) => {
  return (
      <div className="row align-items-center justify-content-between headerContainer">
        <div className="col-1 text-right headerTitleContainer">
            <Link to={'/'}>
              <div className="headerIcon align-middle" />
            </Link>
        </div>
        <div className="col-9 text-left">
          <div className="headerTitle">
            Sticky Shoes
          </div>
        </div>
        <div className="col-1 text-right headerCartContainer">
          <Link to={'/cart'}>
            <div className="cursor text-white shoppingCart">
            </div>
          </Link>
        </div>
        <div className="col-1">
          <div className="cartLength">
            Cart ({props.cartLength})
          </div>
        </div>
      </div>
  );
}

export default Header;
