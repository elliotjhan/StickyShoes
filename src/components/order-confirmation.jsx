import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './../styles/order-confirmation.css';

const OrderConfirmation = (props) => {
  const [confirmationInfo, setConfirmationInfo] = useState({});
  const [confirmationNumber, setConfirmationNumber] = useState(0);

  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    setConfirmationNumber(Math.floor(Math.random() * 100000));
    setConfirmationInfo(props.info);
    props.deleteCart();
    props.setInfo({
      name: null,
      creditCard: null,
      address: null,
      city: null,
      state: null,
      zipcode: null
    });
  }, [])

  const handleBackToCatalog = () => {
    props.setOrderSummary([]);
  }

  const renderOrderSummaryItems = () => {
    let orderSummary = props.orderSummary;
    let orderSummaryElements = orderSummary.map(element => {
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
    return orderSummaryElements;
  }

  const getOrderTotal = () => {
    let orderSummary = props.orderSummary;
    let total = 0;
    orderSummary.forEach(element => {
      total += parseInt(element.quantity) * parseInt(element.price);
    });
    return numberWithCommas(total);
  }

  const getOrderSummaryLength = () => {
    let orderSummary = props.orderSummary;
    let length = 0;
    orderSummary.forEach(element => {
      length += parseInt(element.quantity);
    });
    return length;
  }

  if(confirmationInfo.name) {
    return (
      <div className="container text-center orderSummaryContainer">
        <div className="row mt-5">
          <div className="col display-5">
            Order Summary For {confirmationInfo.name}
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col orderSummaryItemTotal">Confirmation#: {confirmationNumber}</div>
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
            Shipped To: {confirmationInfo.address} {confirmationInfo.city}, {confirmationInfo.state} {confirmationInfo.zipcode}
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
            <Link to="/">
              <button onClick={() => handleBackToCatalog()} className="btn btn-primary">Home</button>
            </Link>
          </div>
        </div>
        <br/>
      </div>
    );
  } else {
    return (
      <div className="container text-center orderSummaryContainer">
        <div className="row my-5">
          <div className="col display-5">
            Go back to Home Page
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to="/">
              <button className="btn btn-primary">Home</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderConfirmation;
