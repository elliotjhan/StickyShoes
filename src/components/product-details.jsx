import React, { useState, useEffect } from 'react';
import Quantity from './quantity';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import './../styles/product-details.css';
import Cookies from 'js-cookie';

const ProductDetails = (props) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(null);

  useEffect(() => {
    getCurrentProduct();
  })

  const getCurrentProduct = () => {
    if(Cookies.get('currentProduct')) {
      let cookieProduct = Cookies.get('currentProduct');
      for(let i = 0; i < props.productList.length; i++) {
        if(cookieProduct === props.productList[i].name) {
          setProduct(props.productList[i]);
          break;
        }
      }
    } else if(props.currentProduct){
      setProduct(props.currentProduct);
      Cookies.set('currentProduct', props.currentProduct.name);
    } else {
      Cookies.remove('currentProduct');
    }
  }

  const addToCart = () => {
    props.addToCart(product.productid, quantity, product.price);
    setModalIsOpen(!modalIsOpen);
  }

  const numberWithCommas = (number) => { // regex method to put in commas at thousands places
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    setQuantity(quantity - 1);
  }

  const renderProductImageCarousel = () => {
    let imageArray = product.carousel;
    if(product.carousel) {
      let carousel = imageArray.map(element => {
        let url = require(`./../assets/images/${element}`);
        return (
          <div key={imageArray.indexOf(element)}>
            <img className="carouselImage" src={url}/>
          </div>
        );
      });
      return carousel;
    }
  }

  if (product) {
    return (
      <React.Fragment>
      <div className="row">
        <div className="col">
          <Link style={{textDecoration: 'none', color: 'black'}} to="/">
              <span className="cursor">
                &lt;Keep Shopping
              </span>
          </Link>
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col-6">
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            width="30vw"
            margin='auto'
            interval={2500}
            infiniteLoop={true}
            stopOnHover={true}>
            {renderProductImageCarousel()}
          </Carousel>
        </div>
        <div className="col-6">
          <div className="display-3 productDetailsName">{product.name}</div><br/>
          <h3 className="font-weight-bold">${numberWithCommas(product.price)}</h3><br/>
          <div className="font-italic">{product.description}</div><br/>
          <Quantity 
            increment={increment}
            decrement={decrement}
            quantity={quantity}
          />
          <Link to="/">
            <button className="btn btn-info mr-3">Keep Shopping</button>
          </Link>
          <button className="btn btn-primary" onClick={() => addToCart()}>Add To Cart</button>
        </div>
      </div>
      <div className="row">
        <div className="col">{product.description}</div>
      </div>
        <Modal isOpen={modalIsOpen}>
          <ModalHeader>
            Product has been added to cart!
          </ModalHeader>
          <ModalFooter>
            <Link to="/">
              <Button onClick={() => setModalIsOpen(!modalIsOpen)} color="info">Keep Shopping</Button>
            </Link>
            <Link to="/cart">
              <Button color="primary">Go To Cart</Button>
            </Link>
          </ModalFooter>
        </Modal>
      
      </React.Fragment>
    );
  } 
}

export default ProductDetails;
