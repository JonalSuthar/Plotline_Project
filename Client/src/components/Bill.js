import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
// import CartItem from "./CartItem";
import { Button } from "../styles/Button";
import FormatPrice from "../Helpers/FormatPrice";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Bill() {
  const { cart, total_price, tax_fee, total_item } = useCartContext();

  const handleConfirmOrder = async () => {
    const orderData = {
      products: cart.map(item => item.name),
      totalItems: total_item,
      subtotal: total_price,
      totalTax: tax_fee,
      orderTotal: total_price + tax_fee,
    };

    try {
      const response = await axios.post("https://plotline-project.onrender.com/orders", orderData);
      console.log("Order placed:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Wrapper>
      <div className="order-total--amount">
        <h2>ORDER SUMMARY</h2>
        <div className="order-total--subdata">
            <div className="itemname">
            <h3>products:</h3>
            {cart.map((item, index) => (
            <li key={index}>
              <div className="itmss">
                <p>{item.name}</p>
                {/* <img src={item.image} alt={item.name} /> */}
              </div>
            </li>
          ))}
            </div>
            <h3>Total Bill:</h3>
          <div className="inn">
            <p>Total Items:</p>

            <p className="it">{total_item}</p>
          </div>
          <div className="inn">
            <p>subtotal:</p>
            <p className="it">
              <FormatPrice price={total_price} />
            </p>
          </div>
          <div className="inn">
            <p>Total Tax:</p>
            <p className="it">
              <FormatPrice price={tax_fee} />
            </p>
          </div>
          <hr />
          <div className="inn">
            <p>order total:</p>
            <p className="it">
              <FormatPrice price={tax_fee + total_price} />
            </p>
          </div>
          <p>Cash on Delivery</p>
        </div>
        <NavLink to="/orderplaced">
        <Button onClick={handleConfirmOrder} className="btn">Confirm Order</Button>
        </NavLink>
        
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
h2{
  font-size: xx-large;
  margin-bottom: 5px;
}
p{
  font-weight: bold;
}
.itmss{
    display: flex;
    /* flex-direction: row; */
}
  .btn {
    margin-top: 15px;
  }
  .it {
    /* color: violet */
  }
  .inn {
    display: flex;
    gap: 60%;
  }
  .order-total--amount {
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    /* justify-content: flex-end; */
    align-items: center;
  }
  .order-total--subdata {
    background-color: #f0f0f0;
    text-align: center;
    width: 50%;
    border: 0.1rem solid #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    padding: 3.2rem;
  }
`;

export default Bill;
