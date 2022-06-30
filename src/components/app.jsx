import { React, useState, useEffect } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LandingPage from './landing-page';
import OrderConfirmation from './order-confirmation';
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [info, setInfo] = useState({
    name: null,
    creditCard: null,
    address: null,
    city: null,
    state: null,
    zipcode: null
  });

  useEffect(() => {
    generateConfirmationNumber();
    getProducts();
    getCartItems();
  }, []);

  const getProducts = () => {
    fetch('/products')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        setProducts(myJson);
      })
      .catch(error => {
        console.error('error: ', error);
      });
  }

  const getCartItems = () => {
    fetch('/cart')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setCartData(myJson);
        getCartLength(myJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getCartLength = (data) => {
    let length = 0;
    for (let i = 0; i < data.length; i++) {
      length += parseInt(data[i].quantity);
    }
    setCartLength(length);
  }

  const addToCart = (productid, quantity, price) => {
    fetch('/addtocart', {
      method: 'POST',
      body: JSON.stringify({
        productid,
        quantity,
        price
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      getCartItems();
    })
    .catch(error => {
      console.error('Post Error: ', error);
    });
  }

  const updateCart = (quantity, productid) => {
    fetch('/updatecart', {
      method: 'PUT',
      body: JSON.stringify({
        quantity,
        productid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      getCartItems();
    })
    .catch(error => {
      console.error('Post Error: ', error);
    });
  }

  const deleteCart = (cartId) => {
    fetch('/deletecart', {
      method: 'DELETE',
      body: JSON.stringify({
        cartId: parseInt(cartId)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      getCartItems();
    })
    .catch(error => {
      console.error('Post Error: ', error);
    });
  }

  const generateConfirmationNumber = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const pool = [letters, numbers];
    let confirmationNumber = '';
    for (let i = 0; i < 10; i++) {
      let zeroOrOne = Math.floor(Math.random() * 2);
      let currentPool = pool[zeroOrOne];
      let currentSelection = currentPool[Math.floor(Math.random() * currentPool.length)];
      confirmationNumber += currentSelection;
    }
    setConfirmationNumber(confirmationNumber);
  }

  let headerElement = <Header           
                        getCartItems={getCartItems}
                        cartLength={cartLength}
                      />
  return(
    <Routes>
      <Route path='/' element={<LandingPage />}>
      </Route>
      <Route path='/catalog' element={
        <>
          {headerElement}
          <ProductList 
            productList={products}
            setCurrentProduct={setCurrentProduct}
          />
        </>
      }>
      </Route>
      <Route path='/catalog/details' element={
        <>
          {headerElement}
          <ProductDetails 
            getCartItems={getCartItems}
            addToCart={addToCart}
            currentProduct={currentProduct}
            productList={products}
          />
        </>
      }>
      </Route>
      <Route path='/cart' element={
        <>
          {headerElement}
          <CartSummary
            updateCart={updateCart}
            cartData={cartData}
            cartLength={cartLength}
            getCartItems={getCartItems}
          />
        </>
      }>
      </Route>
      <Route path='/checkout' element={
        <>
          {headerElement}
          <CheckoutForm
            cartData={cartData}
            getCartItems={getCartItems}
            info={info}
            setInfo={setInfo}
          />
        </>
      }>
      </Route>
      <Route path='/confirmation' element={
        <>
          {headerElement}
          <OrderConfirmation
            generateConfirmationNumber={generateConfirmationNumber}
            confirmationNumber={confirmationNumber}
            setInfo={setInfo}
            info={info}
            cartData={cartData}
            deleteCart={deleteCart}
          />
        </>
      }>
      </Route>
    </Routes>
  )
}

export default App;
