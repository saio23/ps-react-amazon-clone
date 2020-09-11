import React, { forwardRef } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  const shuffle = () => {
    dispatch({
      type: "shuffle",
    });
  };

  const AnimationProduct = React.forwardRef(({ item, index }, ref) => (
    <div ref={ref}>
      <CheckoutProduct key={`anim index ${item.id}`} {...item} />
    </div>
  ));

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div className='checkout__titleInfo'>
          <div className="checkout__user">
            <h2>Hello, {user ? user.email : "Guest"}</h2>
          </div>
          <div className="checkout__title">
            {basket?.length == 0 ? (
              <h2>Your shopping basket is empty.</h2>
            ) : (
              <h2>Your shopping basket :</h2>
            )}
            <button onClick={shuffle}>Shuffle</button>
          </div>
        </div>

        <div className="checkout__products">
          <FlipMove duration={300} easing="ease-out">
            {basket.map((item, index) => (
              <AnimationProduct
                item={item}
                key={item.id + item.title + item.index}
                index={index}
              />
            ))}
          </FlipMove>
        </div>
      </div>

      <div className="checkout__right">
        <div className="checkout__subtotal">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
