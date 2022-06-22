import { React, useState, useEffect } from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import LandingPage from './landing-page';
import OrderConfirmation from './order-confirmation';

const App = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('landingPage');
  const [cartData, setCartData] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [orderSummary, setOrderSummary] = useState([]);
  const [creditCard, setCreditCard] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [cartError, setCartError] = useState(null);
  const [name, setName] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState(null);

  useEffect(() => {
    generateConfirmationNumber();
    // getProducts();
    // getCartItems();
  }, []);

  const getProducts = () => {
    fetch('/api/products.php')
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
    fetch('/api/cart.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setCartError(myJson);
        getCartLength(); // might have to async await here
      })
      .catch(error => {
        this.setState({
          cartError: error
        });
      });
  }

  const getCartLength = () => {
    let length = 0;
    for (let i = 0; i < cartData.length; i++) {
      length += parseInt(cartData[i].count);
    }
    setCartLength(length);
  }

  const addToCart = (product, quantity) => {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify({
        id: parseInt(product.id),
        count: quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(error => {
        console.error('Post Error: ', error);
      });
  }

  const updateCart = (productId, count) => {
    fetch('/api/cart.php', {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(productId),
        newCount: count
      }),
      headers: {
        'Content-Type': 'application/json'
      }
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
    setView({
      name: 'catalog',
      params: {}
    });
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

  if (view === 'details') {
    return (
      <div>
        <Header
          resetCardShippingName={resetCardShippingName}
          getCartItems={getCartItems}
          cartLength={cartLength}
          setView={setView}
        />
        <ProductDetails getCartItems={getCartItems}
          addToCart={addToCart}
          setView={setView}
        />
      </div>
    );
  } else if (view === 'catalog') {
    return (
      <div>
        <Header
          resetCardShippingName={resetCardShippingName}
          getCartItems={getCartItems}
          cartLength={cartLength}
          setView={setView}/>
        <ProductList setView={setView}
          productList={products}/>
      </div>
    );
  } else if (view === 'cart') {
    return (
      <div>
        <Header
          resetCardShippingName={resetCardShippingName}
          getCartItems={getCartItems}
          cartLength={cartLength}
          setView={setView}/>
        <CartSummary
          updateCart={updateCart}
          deleteFromCart={deleteFromCart}
          setView={setView}
          cart={cartData}
          getCartItems={getCartItems}/>
      </div>
    );
  } else if (view === 'checkout') {
    return (
      <div>
        <Header
          resetCardShippingName={resetCardShippingName}
          getCartItems={getCartItems}
          cartLength={cartLength}
          setView={setView}/>
        <CheckoutForm
          generateConfirmationNumber={generateConfirmationNumber}
          cart={cartData}
          resetCardShippingName={resetCardShippingName}
          handleInput={handleInput}
          setView={setView}
          getCartItems={getCartItems}
          creditCard={creditCard}
          name={name}
          shippingAddress={shippingAddress}
          storeOrderSummaryInfo={storeOrderSummaryInfo}
          deleteEntireCart={deleteEntireCart}/>
      </div>
    );
  } else if (view === 'landingPage') {
    return (
      <div>
        <LandingPage setView={setView} />
      </div>
    );
  } else if (view === 'orderConfirmation') {
    return (
      <div>
        <Header
          resetCardShippingName={resetCardShippingName}
          getCartItems={getCartItems}
          setView={setView} />
        <OrderConfirmation
          confirmationNumber={confirmationNumber}
          name={name}
          shippingAddress={shippingAddress}
          orderSummary={orderSummary}
          setView={setView}
          resetCardShippingName={resetCardShippingName}
        />
      </div>
    );
  }
}

export default App;
