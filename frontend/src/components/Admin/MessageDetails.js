import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { getAllContacts } from "../../actions/contactAction";
import "./processOrder.css";
import { Container, Row, Col } from "reactstrap";

// Taking same imports
const MessageDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { loading, contacts } = useSelector((state) => state.allContacts);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch, alert, id]);
  let viewedContact;

  viewedContact = contacts.filter((item) => item._id === id);
  console.log(viewedContact);
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <Container>
              <Row>
                <Col xs="12" sm="6">
                  <p>Name: {viewedContact[0].name}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6">
                  <p>Email: {viewedContact[0].email}x</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6">
                  <p>Phone: {viewedContact[0].phone}</p>
                </Col>
              </Row>
            </Container>
          )}
          <Container>
            <Row style={{ overflow: "auto" }}>
              <Col>
                <p>Message: {viewedContact[0].message}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default MessageDetails;
