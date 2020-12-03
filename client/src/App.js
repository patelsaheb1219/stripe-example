import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setproduct] = useState({
    name: "React from facebook",
    price: 10,
    productBy: "facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:5000/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response);
      const { status } = response;
      console.log("Status", status);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
        <StripeCheckout 
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name={'Buy React'}
          amount={product.price * 10}
        >
          <button className="btn-large primary">Buy React in just {product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
