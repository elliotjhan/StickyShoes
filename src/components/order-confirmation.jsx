import React from 'react';
import { Link } from 'react-router-dom'; 

const OrderConfirmation = (props) => {
  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const renderOrderSummaryItems = () => {
    let orderSummary = props.orderSummary;
    let key = 0;
    let orderSummaryToReturn = orderSummary.map(element => {
      const style = {
        backgroundImage: `url(${element.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      };
      key++;
      return (
        <div className="row orderSummaryItemRow" key={key}>
          <div className="col" style={style}>
          </div>
          <div className="col orderSummaryItem my-auto">
            {element.name} <br/>
            ${this.numberWithCommas(element.price)} <br/>
            Quantity: {element.count}
          </div>
        </div>
      );
    });
    return orderSummaryToReturn;
  }

  const getOrderTotal = () => {
    let orderSummary = props.orderSummary;
    let total = 0;
    orderSummary.forEach(element => {
      total += parseInt(element.count) * parseInt(element.price);
    });
    return numberWithCommas(total);
  }

  const getOrderSummaryLength = () => {
    let orderSummary = props.orderSummary;
    let count = 0;
    orderSummary.forEach(element => {
      count += parseInt(element.count);
    });
    return count;
  }

    return (
      <div className="container orderSummaryContainer">
        <div className="row">
          <div className="col display-4">
            Order Summary For {this.props.name}
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
            Shipped To: {props.shippingAddress}
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
              <button className="btn btn-primary">Back To Catalog</button>
            </Link>
          </div>
        </div>
        <br/>
      </div>
    );
}

export default OrderConfirmation;
