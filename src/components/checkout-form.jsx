import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
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

  const getCartTotal = () => {
    let cartTotal = null;
    props.cartData.forEach(element => {
      cartTotal += (parseFloat(element.price) * element.quantity);
    });
    return props.numberWithCommas(cartTotal);
  }

  const getPaypalTotal = () => {
    let cartTotal = null;
    props.cartData.forEach(element => {
      cartTotal += (parseFloat(element.price) * element.quantity);
    });
    return cartTotal;
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    props.setInfo(prevInfo => ({ ...prevInfo, [name]: value }));
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

  if (props.cartData.length > 0) {
    return (
      <div className="checkoutContainer">
        <div className="row justify-content-center">
          <div className="col col-sm-5">
            <div className="checkoutTitle">
              Checkout
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <PayPalScriptProvider
              options={{
                "client-id": "AUB-z_SMoa1ci0d2IJcEfyB3WhNay2Q4VDECOAIeSiArJ82puBD0G3NWYi81K0q_y6K5msWhVGktVc94"
              }}
            >
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "100"
                        }
                      }
                    ]
                  })
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>

        {/* <div className="row justify-content-center">
          <div className="col-5">
            Name <br />
            <input className="checkoutInput" name="name" type="text" onChange={(e) => handleInput(e)} />
          </div>
        </div> <br />
        <div className="row justify-content-center">
          <div className="col-5">
            Credit Card <br />
            <input className="checkoutInput" name="creditCard" type="number" onChange={(e) => handleInput(e)} />
          </div>
        </div> <br />
        <div className="row justify-content-center">
          <div className="col-5">
            Address <br />
            <input className="checkoutInput" name="address" type="text" onChange={(e) => handleInput(e)} />
          </div>
        </div> <br />
        <div className="row justify-content-center">
          <div className="col-3">
            City <br />
            <input className="checkoutInput" name="city" type="text" onChange={(e) => handleInput(e)} />
          </div>
          <div className="col-1">
            State <br />
            <input className="checkoutInput" name="state" type="text" onChange={(e) => handleInput(e)} />
          </div>
          <div className="col-1">
            Zipcode <br />
            <input className="checkoutInput" name="zipcode" type="number" onChange={(e) => handleInput(e)} />
          </div>
        </div> */}

        <div className="row justify-content-center checkoutTotal">
          <div className="col-5">
            Order Total: ${getCartTotal()}
          </div>
        </div>
        <div className="row justify-content-center checkoutButtonContainer">
          <div className="col-5 text-right">
            <button className="checkoutButton" onClick={() => handleCheckout()}>Place Order</button>
          </div>
        </div>
        <div className="row justify-content-center checkoutBottom">
          <div className="col-5">
            <Link style={{ textDecoration: 'none', color: '#000000' }} to="/">
              <span className="cursor keepShopping">
                &lt;Keep Shopping
              </span>
            </Link>
          </div>
        </div>
        <Modal isOpen={modalIsOpen}>
          <ModalBody>
            Please Ensure All Fields Are Completed
          </ModalBody>
          <ModalFooter>
            <button className="returnButton" onClick={() => setModalIsOpen(!setModalIsOpen)} color="primary">Return</button>
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
            <Link to="/">
              <button className="btn btn-primary">Keep Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutForm;
