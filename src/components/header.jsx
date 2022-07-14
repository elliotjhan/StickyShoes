import React from 'react';
import './../styles/header.css';
import { Link } from 'react-router-dom'; 

const Header = (props) => {
  return (
      <div className="row align-items-center justify-content-between headerContainer">
        <div className="col-1 pe-0 text-right headerTitleContainer">
            <Link to={'/'}>
              <div className="headerIcon" />
            </Link>
        </div>
        <div className="col-9 ps-0 text-left">
          <Link style={{textDecoration: 'none'}} to={'/'}>
            <span className="headerTitle">
              Sticky Shoes
            </span>
          </Link>
        </div>
        <div className="col-1">
        </div>
        <div className="col-1 text-center">
          <Link style={{textDecoration: 'none'}} to={'/cart'}>
            <div data-testid="cartLength" className="cartLength">
              Cart ({props.cartLength})
            </div>
          </Link>
        </div>
      </div>
  );
}

export default Header;
