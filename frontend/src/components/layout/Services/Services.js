import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";


import "./Services.css";
const Services = () => {
  return (
    <section className="services-section mt-5">
      <Container>
        <Row>
          <Col lg={{ size: 8, offset: 2 }}>
            <h2 className="  mb-5">Our Services</h2>
            <Row>
              <Col md={{ size: 4 }}>
                <Card className="service-card">
                  <CardBody>
                    <CardTitle>
                      <FontAwesomeIcon
                        color="#097969"
                        icon={faCog}
                        className="service-icon"
                      />
                      Providing suggestions
                    </CardTitle>
                    <p className="service-description mt-3">
                      We facilate our farmers by providing them suggestions related to their crops.
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md={{ size: 4 }}>
                <Card className="service-card">
                  <CardBody>
                    <CardTitle>
                      <FontAwesomeIcon
                        color="#097969"
                        icon={faCog}
                        className="service-icon"
                      />
                      Farmers forum
                    </CardTitle>
                    <p className="service-description mt-3">
                      We ensure to resolve queries of our farmers by facilatating them through farmers forum
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md={{ size: 4 }}>
                <Card className="service-card">
                  <CardBody>
                    <CardTitle>
                      <FontAwesomeIcon
                        color="#097969"
                        icon={faCog}
                        className="service-icon"
                      />
                      Listing of products
                    </CardTitle>
                    <p className="service-description mt-3">
                      We provide platform for farmers and vendors where they can list their products.
              
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={{ size: 4 }}>
                <Card className="service-card">
                  <CardBody>
                    <CardTitle>
                      <FontAwesomeIcon
                        color="#097969"
                        icon={faCog}
                        className="service-icon"
                      />
                      Renting machinery
                    </CardTitle>
                    <p className="service-description mt-3">
                      We provide platform where farmers can rent machinery and farming products. 
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md={{ size: 4 }}>
                <Card className="service-card">
                  <CardBody>
                    <CardTitle>
                      <FontAwesomeIcon
                        color="#097969"
                        icon={faCog}
                        className="service-icon"
                      />
                      Purchasing crops
                    </CardTitle>
                    <p className="service-description mt-3">
                    We provide platform for buyers where they can buy crops at cheap rates.
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md={{ size: 4 }}>
                <Card className="service-card">
                  <CardBody>
                    <CardTitle>
                      <FontAwesomeIcon
                        color="#097969"
                        icon={faCog}
                        className="service-icon"
                      />
                      Payment
                    </CardTitle>
                    <p className="service-description mt-3">
                      We provide facility of online payment and cash on delivery for easing our users.
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;
