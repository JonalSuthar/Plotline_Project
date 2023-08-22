import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import FormatPrice from "../Helpers/FormatPrice";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Wrapper>
      <h2>ORDER HISTORY</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <h3>Order {index + 1}</h3>
            <div className="order-details">
              <div className="order-items">
                <h4>Products:</h4>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
              <div className="order-total">
                <h4>Total Items:</h4>
                <p>{order.totalItems}</p>
                <h4>Subtotal:</h4>
                <p>
                  <FormatPrice price={order.subtotal} />
                </p>
                <h4>Total Tax:</h4>
                <p>
                  <FormatPrice price={order.totalTax} />
                </p>
                <h4>Order Total:</h4>
                <p>
                  <FormatPrice price={order.orderTotal} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  h2 {
    margin-top: 10px;
    text-align: center;
    font-size: xx-large;
    margin-bottom: 5px;
  }
  h3{
    text-align: center;
    font-size: larger;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .order-list {
    align-items: center;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    font-size: large;
  }

  .order-card {
    width: 50%;
    border: 0.1rem solid #f0f0f0;
    padding: 1.6rem;
    background-color: #f0f0f0;
  }

  .order-details {
    display: flex;
    justify-content: space-between;
  }

  .order-items {
    flex: 1;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  .order-total {
    flex: 1;
    text-align: right;
  }
`;

export default OrderHistory;
