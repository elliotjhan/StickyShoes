import React, { useState, useEffect } from 'react';
import QuantityUpdate from './quantityUpdate';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './../styles/cart-summary-item.css';

const CartSummaryItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setQuantity(props.quantity);
  }, [])

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    if (quantity < 1) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  }

  let product = props.product;
  let imageName = product.image;
  const background = require(`./../assets/images/${imageName}`);
  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="row align-items-center">
      <div className="col-sm-6 productItem" style={style}></div>
      <div className="col-sm-6">
        <div className="cartProductName">{product.name}</div>
        <div className="cartProductPrice">${product.price}</div>
        <div className="row align-items-center">
          <div className="col-3">
            <QuantityUpdate increment={increment} decrement={decrement} quantity={quantity}/>
          </div>
          <div className="col">
            <button onClick={() => props.updateCart(quantity, props.product.productid)} className="updateButton">Update</button>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={modalIsOpen}>
        <ModalBody>
            Are you sure you want to delete {product.name}?
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setModalIsOpen(!modalIsOpen)}>No</Button>
          <Button onClick={() => props.updateCart(0, props.product.productid)} color="primary">Yes</Button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
}

export default CartSummaryItem;
