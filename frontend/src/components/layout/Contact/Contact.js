import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";
import { useDispatch } from "react-redux";
import { clearErrors, createContact } from "../../../actions/contactAction";
import { useAlert } from "react-alert";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("phone", phone);
    myForm.set("email", email);
    myForm.set("message", message);
    if (!phone || !name || !email || !message) {
      alert.show("Kindly fill right details!", { timeout: 2000 });
    } else if (phone.toString().length !== 11) {
      alert.show("Phone Details should be 11", { timeout: 2000 });
    } else {
      alert.show("Successfully Send", { timeout: 2000 });

      dispatch(createContact(myForm));
    }
  };

  return (
    <Container className="contact-us-container">
      <Row>
        <Col>
          <h2 className=" mb-4">Contact Us</h2>
          <Form
            className="contact-form-container form-inline"
            onSubmit={handleSubmit}
          >
            <div className="d-flex">
              <FormGroup>
                <Label for="name">
                  <FontAwesomeIcon
                    color="#097969"
                    icon={faEnvelope}
                    className="me-2"
                  />
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  pattern="[A-Za-z]+"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="ms-3">
                <Label for="email">
                  <FontAwesomeIcon
                    color="#097969"
                    icon={faEnvelope}
                    className="me-2"
                  />
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="phone">
                <FontAwesomeIcon
                  color="#097969"
                  icon={faPhone}
                  className="me-2"
                />
                Phone
              </Label>
              <Input
                // maxLength={11}
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
            <Button className="bg-success" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
