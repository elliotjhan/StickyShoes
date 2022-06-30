import React from 'react';
import './../styles/header.css';
import { Link } from 'react-router-dom'; 

const Header = (props) => {
  return (
    <div className="container-fluid headerContainer">
      <div className="row headerRow">
        <div className="col-lg-8 col-md-8 col-sm-8 text-left mb-3 mt-3 headerTitleContainer">
          <div className="headerTitle display-3">
            <Link to={'/'}>
              <div className="headerIcon align-middle mr-3" />
            </Link>
              Sticky Shoes
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 mt-3 headerCartContainer">
          <Link to={'/cart'}>
            <div className="cursor text-white shoppingCart">
              <div className="cartLength">
                {props.cartLength}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
