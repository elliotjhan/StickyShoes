import React from 'react';

class OrderConfirmation extends React.Component {

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleSetView() {
    this.props.setView('catalog', {});
    this.props.resetCardShippingName();
  }

  renderOrderSummaryItems() {

    let orderSummary = this.props.orderSummary;
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

  getOrderTotal() {
    let orderSummary = this.props.orderSummary;
    let total = 0;
    orderSummary.forEach(element => {
      total += parseInt(element.count) * parseInt(element.price);
    });
    return this.numberWithCommas(total);
  }

  getOrderSummaryLength() {
    let orderSummary = this.props.orderSummary;
    let count = 0;
    orderSummary.forEach(element => {
      count += parseInt(element.count);
    });
    return count;
  }

  render() {

    return (
      <div className="container orderSummaryContainer">
        <div className="row">
          <div className="col display-4">
                        Order Summary For {this.props.name}
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col orderSummaryItemTotal">Confirmation#: {this.props.confirmationNumber}</div>
        </div>
        <div className="row">
          <div className="col orderSummaryItemTotal">
            {this.getOrderSummaryLength()} Item(s)
          </div>
        </div>
        <div className="row">
          <div className="col orderSummaryItemTotal">
                        Order Total: ${this.getOrderTotal()}
          </div>
        </div>
        <div className="row">
          <div className="col orderSummaryItemTotal">
            Shipped To: {this.props.shippingAddress}
          </div>
        </div>
        <div className="row">
          <div className="col">
                        *Please note that this was not a real purchase* <br/>
                        *Thank you for demoing Sticky Shoes*
          </div>
        </div>
        {this.renderOrderSummaryItems()}
        <br/>
        <div className="row">
          <div className="col">
            <button onClick={this.handleSetView.bind(this)} className="btn btn-primary">Back To Catalog</button>
          </div>
        </div>
        <br/>
      </div>
    );

  }

}

export default OrderConfirmation;
