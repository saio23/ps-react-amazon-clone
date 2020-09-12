import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer"
import axios from "./axios";



function Payment() {

  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({ 
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${(getBasketTotal(basket) * 100)}`
      });

      setClientSecret(response.data.clientSecret)
      
    }

    getClientSecret();
  }, [basket])
  console.log('THE SECRET IS >>>', clientSecret)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // paymentIntent = payment confirmation
      setSucceeded(true);
      setError(null)
      setProcessing(false);

      history.replace('/orders');
    })


  };

  const handleChange = (event) => {
    // Listen for changes in CardElement 
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout ( <Link to='./checkout'> {basket?.length} items
               </Link>)
          </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Adrdress</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Kilkis 10, Aradippou</p>
            <p>Larnaca, CY</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct {...item} />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            // Stripe code 
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  value={getBasketTotal(basket)}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€ "}
                  renderText={(value) => (
                    <h3>Order Total:{value}</h3>
                  )}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>



            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
