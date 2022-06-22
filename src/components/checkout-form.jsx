import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null,
      modalIsOpen: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDeleteCartUponCompletingCheckout = this.handleDeleteCartUponCompletingCheckout.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getCartTotal() {
    let cartTotal = null;
    this.props.cart.forEach(element => {
      cartTotal += parseFloat(element.price); // using the array forEach method to get the total amount of all prices
    });
    return this.numberWithCommas(cartTotal);
  }

  handleInput(event) {
    let value = event.target.value; // this updates state as the user types in their input through onChange
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSetView() {
    let setView = this.props.setView;
    let catalog = 'catalog';
    let params = '{}';
    setView(catalog, params);
    this.props.getCartItems();
  }

  handleDeleteCartUponCompletingCheckout() {
    this.toggleModal();
    let deleteEntireCart = this.props.deleteEntireCart;
    let cartId = this.props.cart[0].cartID;
    deleteEntireCart(cartId);
    this.handleSetView();
    
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="container mt-3 checkout">
        <div className="row">
          <div className="col col-sm-12">
            <div className="display-4 checkoutTitle">Checkout</div>
                        Order Total: ${this.getCartTotal()}
          </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className="col">
                        Name <br/>
            <input className="form-control" name="name" type="text" onChange={this.handleInput}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
                        Credit Card <br/>
            <input className="form-control" name="creditCard" type="text" onChange={this.handleInput}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
                        Shipping Address <br/>
            <textarea rows="4" className="form-control" name="shippingAddress" type="text" onChange={this.handleInput}/>
          </div>
        </div>
        <div className="row mt-2">
          <div onClick={this.handleSetView.bind(this)} className="col cursor text-secondary">
                        &lt;Continue Shopping
          </div>
          <div className="col text-right">
            <button className="btn btn-primary" onClick={this.toggleModal}>Place Order</button>
          </div>
        </div>

        <Modal isOpen={this.state.modalIsOpen}>
            <ModalHeader>
              Order Has Been Submitted!
            </ModalHeader>
            <ModalFooter>
              <Button onClick={this.handleDeleteCartUponCompletingCheckout} color="primary">Back To Catalog</Button>
            </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default CheckoutForm;
