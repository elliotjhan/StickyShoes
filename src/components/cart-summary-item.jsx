import React, { useState, useEffect } from 'react';
import QuantityUpdate from './quantityUpdate';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CartSummaryItem = (props) => {
  const [count, setCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    handleCount();
  }, [])

  const handleDeleteCallback = () => {
    let product = props.product;
    props.deleteFromCart(product.id);
    props.getCartItems();
  }

  const handleUpdateCallback = () => {
    let product = props.product;
    props.updateCart(product.id, count);
    props.getCartItems();
  }

  const handleCount = () => {
    setCount(props.count);
  }

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    if (count < 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  }

  let product = props.product;
  let imageName = props.image;
  const background = require(`./../assets/images/${imageName}`);
  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };
  return (
    <div className="container p-4">
      <div className="row mt-3">
        <div className="col productItem" style={style}></div>
        <div className="text-left col-sm-6 mt-3 text-center">
          <h6 className="cartProductName">{product.name}</h6><br/>
          <div className="productPrice">Price: ${product.price}</div>
          <QuantityUpdate increment={increment} decrement={decrement} quantity={count}/>
          <button onClick={() => handleUpdateCallback()} className="btn btn-primary">Update</button>
          <button onClick={() => setModalIsOpen(!modalIsOpen)} className="btn btn-danger ml-2">Delete</button>
        </div>
      </div>

      <Modal isOpen={this.state.modalIsOpen}>
        <ModalHeader>
            Caution!
        </ModalHeader>
        <ModalBody>
            Are you sure you want to delete {product.name}?
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setModalIsOpen(!modalIsOpen)}>No</Button>
          <Button onClick={() => handleDeleteCallback()} color="primary">Yes</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default CartSummaryItem;
