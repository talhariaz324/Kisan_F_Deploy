import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog } from "@fortawesome/free-solid-svg-icons";
import "./Features.css";

const Features = () => {
  return (
    <section className="features-section">
      <Container>
        <h1 className="   features ">Our Features</h1>
        <Row>
          <Col lg={{ size: 4, offset: 2 }}>
            <div className="feature-item">
              <FontAwesomeIcon
                color="#097969"
                icon={faCheck}
                className="feature-icon"
              />
              <h3 className="feature-title">100% organic</h3>
              <p className="feature-description">
              100% organic with no artifical fertilizer usage.
              GMO free seeds used to ensure a more natural approach.
              </p>
            </div>
          </Col>
          <Col lg={{ size: 4 }}>
            <div className="feature-item">
              <FontAwesomeIcon
                color="#097969"
                icon={faCog}
                className="feature-icon"
              />
              <h3 className="feature-title">Modern farming</h3>
              <p className="feature-description">
              Modern farming technology and methods are used.
              Making farming easier ang giving high yield
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={{ size: 4, offset: 2 }}>
            <div className="feature-item">
              <FontAwesomeIcon
                color="#097969"
                icon={faCheck}
                className="feature-icon"
              />
              <h3 className="feature-title">Chemical Free</h3>
              <p className="feature-description">
              Chemical Free crops ready to use.
              All crops are pesticide and preservative-free.
              </p>
            </div>
          </Col>
          <Col lg={{ size: 4 }}>
            <div className="feature-item">
              <FontAwesomeIcon
                color="#097969"
                icon={faCog}
                className="feature-icon"
              />
              <h3 className="feature-title">24/7 support</h3>
              <p className="feature-description">
              24/7 buying and selling available
              This is for facilitating our users
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
