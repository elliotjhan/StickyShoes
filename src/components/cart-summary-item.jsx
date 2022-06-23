import React from 'react';
import QuantityUpdate from './quantityUpdate';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      modalIsOpen: false
    };
    this.handleUpdateCallback = this.handleUpdateCallback.bind(this);
    this.handleDeleteCallback = this.handleDeleteCallback.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.handleCount();
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleDeleteCallback() {
    let product = this.props.product;
    this.props.deleteFromCart(product.id);
    // setTimeout(()=> {
    //   this.props.getCartItems();
    // }, 200)
    this.props.getCartItems();

  }

  handleUpdateCallback() {
    let product = this.props.product;
    let newCount = this.state.count;
    this.props.updateCart(product.id, newCount);
    // setTimeout(()=> {
    //   this.props.getCartItems();
    // }, 200)
    this.props.getCartItems();

  }

  handleCount() {
    this.setState({
      count: this.props.count
    });
  }

  increment() {
    let count = this.state.count;
    let newCount = ++count;
    this.setState({
      count: newCount
    });
  }

  decrement() {
    let count = this.state.count;
    let newCount = --count;
    if (newCount < 0) {
      newCount = 0;
    }
    this.setState({
      count: newCount
    });
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    let product = this.props.product;
    const style = {
      backgroundImage: `url(${product.image})`,
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
            <div className="productPrice">Price: ${this.numberWithCommas(product.price)}</div>
            <QuantityUpdate increment={this.increment} decrement={this.decrement} quantity={this.state.count}/>
            <button onClick={this.handleUpdateCallback} className="btn btn-primary">Update</button>
            <button onClick={this.toggleModal} className="btn btn-danger ml-2">Delete</button>
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
            <Button onClick={this.toggleModal}>No</Button>
            <Button onClick={this.handleDeleteCallback} color="primary">Yes</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }

}

export default CartSummaryItem;
