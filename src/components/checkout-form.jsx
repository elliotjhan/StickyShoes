import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom'; 

const CheckoutForm = (props) => {
  const [name, setname] = useState(null);
  const [creditCard, setcreditCard] = useState(null);
  const [shippingAddress, setshippingAddress] = useState(null);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [info, setInfo] = useState({
    name: null,
    creditCard: null,
    shippingAddress: null
  })

  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getCartTotal = () => {
    let cartTotal = null;
    props.cartData.forEach(element => {
      cartTotal += parseFloat(element.price); // using the array forEach method to get the total amount of all prices
    });
    return numberWithCommas(cartTotal);
  }

  const handleInput = (event) => {
    let value = event.target.value; // this updates state as the user types in their input through onChange
    let name = event.target.name;
    setInfo(info[name] = value);
  }

  const handleDeleteCartUponCompletingCheckout = () => {
    setmodalIsOpen(!modalIsOpen)
    props.deleteCart();
    <Navigate to="/catalog" />
  }

    return (
      <div className="container mt-3 checkout">
        <div className="row">
          <div className="col col-sm-12">
            <div className="display-4 checkoutTitle">Checkout</div>
              Order Total: ${getCartTotal()}
          </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className="col">
            Name <br/>
            <input className="form-control" name="name" type="text" onChange={(e) => handleInput(e)}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
            Credit Card <br/>
            <input className="form-control" name="creditCard" type="text" onChange={(e) => handleInput(e)}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
            Shipping Address <br/>
            <textarea rows="4" className="form-control" name="shippingAddress" type="text" onChange={(e) => handleInput(e)}/>
          </div>
        </div>
        <div className="row mt-2">
          <Link to="/catalog">
            <div className="col cursor text-secondary">
              &lt;Continue Shopping
            </div>
          </Link>
          <div className="col text-right">
            <button className="btn btn-primary" onClick={() => setmodalIsOpen(!modalIsOpen)}>Place Order</button>
          </div>
        </div>

        <Modal isOpen={modalIsOpen}>
            <ModalHeader>
              Order Has Been Submitted!
            </ModalHeader>
            <ModalFooter>
              <Button onClick={() => handleDeleteCartUponCompletingCheckout()} color="primary">Back To Catalog</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
}

export default CheckoutForm;
