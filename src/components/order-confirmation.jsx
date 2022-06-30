import React from 'react';
import { Link } from 'react-router-dom'; 
import './../styles/order-confirmation.css';

const OrderConfirmation = (props) => {
  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleBackToCatalog = () => {
    props.deleteCart();
    props.setInfo({
      name: null,
      creditCard: null,
      address: null,
      city: null,
      state: null,
      zipcode: null
    });
    props.generateConfirmationNumber();
  }

  const renderOrderSummaryItems = () => {
    let cartData = props.cartData;
    let orderSummary = cartData.map(element => {
      let background = require(`./../assets/images/${element.image}`);
      const style = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '15vw',
      };
      return (
        <div className="row justify-content-center" key={element.id}>
          <div className="col-3" style={style}></div>
          <div className="col-3 my-auto">
            {element.name} <br/>
            ${numberWithCommas(element.price)} <br/>
            Quantity: {element.quantity}
          </div>
        </div>
      );
    });
    return orderSummary;
  }

  const getOrderTotal = () => {
    let cartData = props.cartData;
    let total = 0;
    cartData.forEach(element => {
      total += parseInt(element.quantity) * parseInt(element.price);
    });
    return numberWithCommas(total);
  }

  const getOrderSummaryLength = () => {
    let cartData = props.cartData;
    let length = 0;
    cartData.forEach(element => {
      length += parseInt(element.quantity);
    });
    return length;
  }

  return (
    <div className="container text-center orderSummaryContainer">
      <div className="row mt-5">
        <div className="col display-5">
          Order Summary For {props.info.name}
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col orderSummaryItemTotal">Confirmation#: {props.confirmationNumber}</div>
      </div>
      <div className="row">
        <div className="col orderSummaryItemTotal">
          {getOrderSummaryLength()} Item(s)
        </div>
      </div>
      <div className="row">
        <div className="col orderSummaryItemTotal">
          Order Total: ${getOrderTotal()}
        </div>
      </div>
      <div className="row">
        <div className="col orderSummaryItemTotal">
          Shipped To: {props.info.address} {props.info.city}, {props.info.state} {props.info.zipcode}
        </div>
      </div>
      <div className="row">
        <div className="col">
          *Please note that this was not a real purchase* <br/>
          *Thank you for demoing Sticky Shoes*
        </div>
      </div>
      {renderOrderSummaryItems()}
      <br/>
      <div className="row">
        <div className="col">
          <Link to="/catalog">
            <button onClick={() => handleBackToCatalog()} className="btn btn-primary">Back To Catalog</button>
          </Link>
        </div>
      </div>
      <br/>
    </div>
  );
}

export default OrderConfirmation;
