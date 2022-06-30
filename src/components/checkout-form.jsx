import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import './../styles/checkout-form.css';

const CheckoutForm = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 
    props.setInfo({
      name: null,
      creditCard: null,
      address: null,
      city: null,
      state: null,
      zipcode: null
    });
  }, []);

  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const getCartTotal = () => {
    let cartTotal = null;
    props.cartData.forEach(element => {
      cartTotal += (parseFloat(element.price) * element.quantity); 
    });
    return numberWithCommas(cartTotal);
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    props.setInfo( prevInfo => ({ ...prevInfo, [name]: value }) );
  }

  const handleCheckout = () => {
    if (
      props.info.name && 
      props.info.creditCard && 
      props.info.address && 
      props.info.city && 
      props.info.state && 
      props.info.zipcode
    ) {
      navigate('/confirmation');
    } 
    else {
      setModalIsOpen(!modalIsOpen);
    }
  }

  if(props.cartData.length > 0) {
    return (
      <div className="container mt-3 checkout">
        <div className="row">
          <div className="col col-sm-12">
            <div className="display-5 checkoutTitle">Checkout</div>
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
            <input className="form-control" name="creditCard" type="number" onChange={(e) => handleInput(e)}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col">
            Address <br/>
            <input className="form-control" name="address" type="text" onChange={(e) => handleInput(e)}/>
          </div>
        </div> <br/>
        <div className="row">
          <div className="col-6">
            City <br/>
            <input className="form-control" name="city" type="text" onChange={(e) => handleInput(e)}/>
          </div>
          <div className="col-2">
            State <br/>
            <input className="form-control" name="state" type="text" onChange={(e) => handleInput(e)}/>
          </div>
          <div className="col-4">
            Zipcode <br/>
            <input className="form-control" name="zipcode" type="number" onChange={(e) => handleInput(e)}/>
          </div>
        </div> 
        <div className="row mt-5">
          <div className="col text-right">
            <button className="btn btn-primary" onClick={() => handleCheckout()}>Place Order</button>
          </div>
        </div>
        <div className="row">
          <div className="col pt-4">
            <Link to="/catalog">
              <div className='text-secondary'>
                &lt;Continue Shopping
              </div>
            </Link>
          </div>
        </div>
  
        <Modal isOpen={modalIsOpen}>
            <ModalBody>
              Please Ensure All Fields Are Completed
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setModalIsOpen(!setModalIsOpen)} color="primary">Return</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="container mt-3 checkout text-center">
        <div className="row my-5">
          <div className="col col-sm-12">
            <div className="display-5 checkoutTitle">
              Cart Is Empty
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to="/catalog">
              <button className="btn btn-primary">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutForm;
