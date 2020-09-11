import React from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from './CheckoutProduct';
import { Link } from "react-router-dom";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

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

          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
