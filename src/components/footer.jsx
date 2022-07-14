import React from 'react';
import './../styles/footer.css';

const Footer = () => {
  return (
    <div data-testid="footer" className="row justify-content-around align-items-center footerContainer">
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