import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { Tick } from "react-crude-animated-tick";
function Ordered() {
  return (
    <Wrapper>
      <div className="container">
        <div>
          {/* <h2>Done</h2> */}
          <div>
            <Tick size={200} />
          </div>
          <h3>Order Confirmed</h3>
          <p>Your order will be Delivered soon!</p>

          <NavLink to="/products">
            <Button>Continue Shopping</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;

    h2 {
      font-size: 10rem;
    }

    h3 {
      font-size: 4.2rem;
    }

    p {
      margin: 2rem 0;
    }
  }
`;
export default Ordered;
