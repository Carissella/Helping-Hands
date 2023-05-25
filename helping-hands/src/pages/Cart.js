import React, { useEffect, useState } from "react";
import CartProduct from "../components/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (user.token) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const stripe = await stripePromise;
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cartData),
        }
      );

      const data = await res.json();
      console.log(data);

      toast("Redirect to payment Gateway...!");
      stripe.redirectToCheckout({ sessionId: data });
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  console.log(cartData);
  return (
    <>
      <h2 className="p-2 md:p-4 text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>
      <div className="p-2 md:p-4">
        {cartData[0] ? (
          <div className="my-4 flex flex-col md:flex-row gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {cartData.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    description={el.description}
                    setCartData={setCartData}
                    cartData={cartData}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
            <div className="w-full max-w-md h-36  ml-auto bg-white p-2">
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  ${" "}
                  <TextField
                    style={{ marginBottom: 16 }}
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    name="price"
                    onChange={(e) => {
                      localStorage.setItem(
                        "cart",
                        JSON.stringify(
                          cartData.map((item) => {
                            return {
                              ...item,
                              price: parseInt(e.target.value) / cartData.length,
                            };
                          })
                        )
                      );
                      setCartData(
                        cartData.map((item) => {
                          return {
                            ...item,
                            price: parseInt(e.target.value) / cartData.length,
                          };
                        })
                      );
                      setTotalPrice(e.target.value);
                    }}
                  />
                </p>
              </div>
              <Button
                variant="contained"
                className="w-full text-lg font-bold py-2"
                onClick={handlePayment}>
                Payment
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold">Empty</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
