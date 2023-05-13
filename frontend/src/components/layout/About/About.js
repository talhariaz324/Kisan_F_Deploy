import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../About/About.css";
const About = () => {
  return (
    <div className="about-container">
      <Container>
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>
            Our aim to provide maximum profit to our farmers and maximum benefit to our buyers.
             We want to elimination third party interference by providing one to one communication to farmer and buyer. 
             This way farmer can sell crops without help of any contractor and without visiting market.
             Buyer can also by crops on cheap rates as compared to market. 
             We ensure you that our products are organic and chemical-free.
             Our mission is to facilatate both farmer and our buyers by eliminating third party interference and Providing one to one communication.
             We want to facilatate our farmer by maximizing profit and eliminating manaul ctrops selling and buying to online. 
             This way our farmer can easily sell his crops without difficulty of visiting market
            </p>
          </Col>
          <Col className="about">
            <img
              width="480"
              height="auto"
              className="img-responsive"
              src="https://i0.wp.com/the-14.com/wp-content/uploads/2022/05/Person-touching-a-grass.png?resize=1024%2C504&ssl=1"
              alt="About us"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
