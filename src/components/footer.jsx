import React from 'react';
import './../styles/footer.css';
import { Link } from 'react-router-dom'; 

const Footer = (props) => {
  return (
    <div className="row justify-content-around align-items-center footerContainer">
      <div className="col text-center">
        <div>
          &copy; 
          {new Date().getFullYear()} |  
          stickyshoes.elliotjhan.com | All Rights Reserved
        </div>
      </div>
    </div>
  )
}

export default Footer;