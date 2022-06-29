import { React, useState, useEffect } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LandingPage from './landing-page';
import OrderConfirmation from './order-confirmation';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [orderSummary, setOrderSummary] = useState([]);
  const [creditCard, setCreditCard] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [name, setName] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState(null);

  useEffect(() => {
    generateConfirmationNumber();
    getProducts();
    getCartItems();
  }, []);
  
  // useEffect(() => {
  //   getCartItems();
  // }, [cartData]);

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

  const deleteFromCart = (productId) => {
    fetch('/api/cart.php', {
      method: 'DELETE',
      body: JSON.stringify({
        id: parseInt(productId)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
  }

  const deleteEntireCart = (cartId) => {
    fetch('/api/cart.php', {
      method: 'DELETE',
      body: JSON.stringify({
        cartId: parseInt(cartId)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
  }

  const placeOrder = (object) => {
    let currentOrder = cartData.push(object); // object in this case is the name, credit card, and address
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(currentOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
    <Navigate to={'/catalog'}/>
    setCartData([]);
  }

  const storeOrderSummaryInfo = (cart) => {
    setOrderSummary(cart);
  }

  const handleInput = (event) => {
    let value = event.target.value; // this updates state as the user types in their input through onChange
    let name = event.target.name;
    setName(value);
  }

  const resetCardShippingName = () => {
    setName(null);
    setShippingAddress(null);
    setCreditCard(null);
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
                        resetCardShippingName={resetCardShippingName}
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
            deleteFromCart={deleteFromCart}
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
            generateConfirmationNumber={generateConfirmationNumber}
            cart={cartData}
            resetCardShippingName={resetCardShippingName}
            handleInput={handleInput}
            getCartItems={getCartItems}
            creditCard={creditCard}
            name={name}
            shippingAddress={shippingAddress}
            storeOrderSummaryInfo={storeOrderSummaryInfo}
            deleteEntireCart={deleteEntireCart}
          />
        </>
      }>
      </Route>
      <Route path='/confirmation' element={
        <>
          {headerElement}
          <OrderConfirmation
            confirmationNumber={confirmationNumber}
            name={name}
            shippingAddress={shippingAddress}
            orderSummary={orderSummary}
            resetCardShippingName={resetCardShippingName}
          />
        </>
      }>
      </Route>
    </Routes>
  )
}

export default App;
