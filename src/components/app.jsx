import { React, useState, useEffect } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LandingPage from './landing-page';
import OrderConfirmation from './order-confirmation';
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [orderSummary, setOrderSummary] = useState([]);
  const [info, setInfo] = useState({
    name: null,
    creditCard: null,
    address: null,
    city: null,
    state: null,
    zipcode: null
  });

  useEffect(() => {
    getProducts();
    getCartItems();
  }, []);

  const getProducts = () => {
    fetch('/api/products')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setProducts(myJson);
      })
      .catch(error => {
        console.error('error: ', error);
      });
  }

  const getCartItems = () => {
    fetch('/api/cart')
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
    fetch('/api/addtocart', {
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
    fetch('/api/updatecart', {
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
    fetch('/api/deletecart', {
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

  let headerElement = <Header cartLength={cartLength}/>
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
            setOrderSummary={setOrderSummary}
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
            setInfo={setInfo}
            info={info}
            orderSummary={orderSummary}
            setOrderSummary={setOrderSummary}
            deleteCart={deleteCart}
          />
        </>
      }>
      </Route>
    </Routes>
  )
}

export default App;
