import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "./CheckOutSteps";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";
import { createOrder } from "../../actions/orderAction";
import { removeItemsFromCart } from "../../actions/cartAction";
const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  console.log(cartItems);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  // subtotal > 1000 ? 0 : 200
  const shippingCharges = 0;
  // subtotal * 0.18;
  const tax = 0;

  const totalPrice = subtotal;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  const cashOnDelivery = () => {
    const data = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    dispatch(createOrder(data));
    let getIds = [];
    cartItems.map((item) => {
      getIds.push(item.product);
      return "";
    });
    console.log(getIds);
    getIds &&
      getIds.forEach((itemId) => {
        console.log(itemId);
        dispatch(removeItemsFromCart(itemId));
      });
    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X PKR {item.price} ={" "}
                      <b>PKR {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>PKR {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>PKR {shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>PKR {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>PKR {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
            <button onClick={cashOnDelivery}>Cash on Delivery</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
