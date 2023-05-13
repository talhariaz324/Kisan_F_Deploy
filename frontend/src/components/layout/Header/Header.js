import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserOptions from "../../../components/layout/Header/UserOptions.js";
import Logo from "../../../images/logo1.png";
import store from "../../.././store";
import { loadUser } from "../../../actions/userAction";
import { useSelector } from "react-redux";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveH, setIsActiveH] = useState(true);
  const [isActiveP, setIsActiveP] = useState(false);
  const [isActiveC, setIsActiveC] = useState(false);
  const [isActiveA, setIsActiveA] = useState(false);
  const [isActiveS, setIsActiveS] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const toggle = () => {
    // debugger;
    setIsOpen(!isOpen);
  };
  const whichActive = (element) => {
    if (element === "H") {
      setIsActiveH(true);
      setIsActiveP(false);
      setIsActiveA(false);
      setIsActiveC(false);
      setIsActiveS(false);
    } else if (element === "P") {
      setIsActiveH(false);
      setIsActiveP(true);
      setIsActiveA(false);
      setIsActiveC(false);
      setIsActiveS(false);
    } else if (element === "A") {
      setIsActiveH(false);
      setIsActiveP(false);
      setIsActiveA(true);
      setIsActiveC(false);
      setIsActiveS(false);
    } else if (element === "C") {
      setIsActiveH(false);
      setIsActiveP(false);
      setIsActiveA(false);
      setIsActiveC(true);
      setIsActiveS(false);
    } else {
      setIsActiveH(false);
      setIsActiveP(false);
      setIsActiveA(false);
      setIsActiveC(false);
      setIsActiveS(true);
    }
    toggle();
  };
  return (
    <div className="container-fluid ">
      <Navbar
        style={{ backgroundColor: "white" }}
        className="navbar light"
        light
        expand="lg"
      >
        <NavbarBrand>
          <Link className="img" to="/">
            <img
              width="150px"
              height="auto"
              className="img-responsive"
              src={Logo}
              alt="logo"
            />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse
          className="text-center p-3 "
          style={{
            // backgroundColor: "white",
            position: "relative",
            zIndex: 1,
          }}
          isOpen={isOpen}
          navbar
        >
          <Nav
            style={{
              backgroundColor: "white",
            }}
            className="mx-auto"
            navbar
          >
            <NavItem className="navItems">
              <NavLink className=" ms-3 ">
                <Link
                  className={
                    isActiveH ? "active text-light home" : "text-dark "
                  }
                  to="/"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    whichActive("H");
                  }}
                >
                  Home
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="ms-3">
                <Link
                  className={
                    isActiveP === true
                      ? "active text-light home"
                      : " text-dark "
                  }
                  style={{ textDecoration: "none" }}
                  to="/products"
                  onClick={() => {
                    whichActive("P");
                  }}
                >
                  Products
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="ms-3">
                <Link
                  className={
                    isActiveA ? " active text-light home" : " text-dark "
                  }
                  style={{ textDecoration: "none" }}
                  to="/about"
                  onClick={() => {
                    whichActive("A");
                  }}
                >
                  About
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="ms-3">
                <Link
                  className={
                    isActiveS ? "active text-light home " : " text-dark "
                  }
                  style={{ textDecoration: "none" }}
                  to="/services"
                  onClick={() => {
                    whichActive("S");
                  }}
                >
                  Services
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="ms-3">
                <Link
                  className={
                    isActiveC ? "active text-light home " : " text-dark "
                  }
                  style={{ textDecoration: "none" }}
                  to="/contact"
                  onClick={() => {
                    whichActive("C");
                  }}
                >
                  Contact
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="icons">
            {/* <Link to="/search">
              <FontAwesomeIcon color="#097969" id="search" icon={faSearch} />
            </Link>
            <Link to="/cart">
              <FontAwesomeIcon
                color="#097969"
                id="cart"
                icon={faShoppingCart}
              />
            </Link>*/}
            <Link to="/login">
              <FontAwesomeIcon color="#097969" id="user" icon={faUser} />
            </Link>
          </NavbarText>
          {isAuthenticated && <UserOptions user={user} toggler={toggle} />}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
