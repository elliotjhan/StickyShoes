import React, { useState, useEffect } from 'react';
import Quantity from './quantity';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
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

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    if (quantity < 2) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
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
      <div className="row align-items-center justify-content-center productDetailsContainer">
        <div className="col-6">
          <Carousel
            showThumbs={false}s
            showStatus={false}
            autoPlay={true}
            width="30vw"
            interval={2500}
            infiniteLoop={true}
            stopOnHover={true}>
            {renderProductImageCarousel()}
          </Carousel>
        </div>
        <div className="col-6">
          <div className="productDetailsName">{product.name}</div><br/>
          <div className="productDetailsPrice">${props.numberWithCommas(product.price)}</div><br/>
          <div className="productDetailsDescription">{product.description}</div><br/>
          <div className="row align-items-center text-start">
            <div className="col-2">
              <Quantity 
                increment={increment}
                decrement={decrement}
                quantity={quantity}
              />
            </div>
            <div className="col-3">
              <button className="cartButton" onClick={() => addToCart()}>Add To Cart</button>
            </div>
          </div>
          <div className="row keepShoppingContainer">
            <div className="col">
              <Link style={{textDecoration: 'none', color: '#000000'}} to="/">
                <span className="cursor keepShopping">
                  &lt;Keep Shopping
                </span>
              </Link>
            </div>
          </div>
        </div>
        <Modal isOpen={modalIsOpen}>
          <ModalHeader>
            Product has been added to cart
          </ModalHeader>
          <ModalFooter>
            <Link style={{textDecoration: 'none', color: '#000000'}} to="/">
              <span className="keepShopping" onClick={() => setModalIsOpen(!modalIsOpen)}>&lt;Keep Shopping</span>
            </Link>
            <Link to="/cart">
              <button className="cartButton ms-3">Go To Cart</button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
      </React.Fragment>
    );
  } 
}

export default ProductDetails;
