import React, { useState, useEffect } from 'react';
import Quantity from './quantity';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'; 

const ProductDetails = (props) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(null);

  useEffect(() => {
    //retrieveProductById(props.currentItem.id);
  }, [])

  const retrieveProductById = (id) => {
    fetch('/api/products.php?id=' + id)
      .then(response => {
        return response.json();
      }).then(myJson => {
        setProduct(myJson);
      }).catch(error => {
        console.error('error: ', error);
      });
  }

  const addToCart = () => {
    props.addToCart(product, quantity);
    setTimeout(() => {
      props.getCartItems();
    }, 100);
    setModalIsOpen(!modalIsOpen)
  }

  const numberWithCommas = (number) => { // regex method to put in commas at thousands places
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    setQuantity(quantity - 1);
  }

  const renderProductImageCarousel = () => {
    let imageArray = product.image;
    let carousel = imageArray.map(element => {
      return (
        <div key={imageArray.indexOf(element)}>
          <img className="carouselImage" src={element}/>
        </div>
      );
    });
    return carousel;
  }

  if (product) {
    return (
      <div className="container p-4 catalogItem my-5">
        <Link to="/catalog">
          <div className="cursor row mb-4">
            <div className="col text-dark">&lt;Back to catalog</div>
          </div>
        </Link>
        <div className="row mt-4">
          <div className="col-lg-6">
            <Carousel
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              width="30vw"
              interval={2500}
              infiniteLoop={true}
              stopOnHover={true}>
              {renderProductImageCarousel()}
            </Carousel>
          </div>
          <div className="text-center col-lg-6 mt-3">
            <div className="display-3 productDetailsName">{product.name}</div><br/>
            <h3 className="font-weight-bold">${numberWithCommas(product.price)}</h3><br/>
            <div className="font-italic">{product.shortDescription}</div><br/>
            <Quantity 
              increment={increment}
              decrement={decrement}
              quantity={quantity}
            />
            <Link to="/catalog">
              <button className="btn btn-info mr-3">Back To Catalog</button>
            </Link>
            <button className="btn btn-primary" onClick={() => addToCart()}>Add To Cart</button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">{product.longDescription}</div>
        </div>
        <Modal isOpen={modalIsOpen}>
          <ModalHeader>
            Product has been added to cart!
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => setModalIsOpen(!modalIsOpen)} color="info">Keep Shopping</Button>
            <Link to="/cart">
              <Button color="primary">Go To Cart</Button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
}

export default ProductDetails;
