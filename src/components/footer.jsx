import React from 'react';
import './../styles/footer.css';
import { Link } from 'react-router-dom'; 

const Footer = (props) => {
  return (
    <div className="row justify-content-around align-items-center footerContainer mt-5">
      <div className="col text-center">
        <div>
          &copy; 
          {new Date().getFullYear()} |  
          stickyshoes.elliotjhan.com | All rights reserved
        </div>
      </div>
    </div>
  )
}

export default Footer;