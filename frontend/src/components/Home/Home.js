import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "../layout/Carousel/Carousel";
import About from "../layout/About/About";
import Contact from "../layout/Contact/Contact";
import Features from "../layout/Features/Features";
import Services from "../layout/Services/Services";
const Home = ({ user }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    if (error) {
      alert.show(error, { timeout: 2000 });
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    dispatch(getAllUsers());
  }, [dispatch, error, alert]);
  // console.log(users);

  let filteredFarmerProducts = [];
  let filteredBuyerProducts = []; // Also for unauth user.
  // let productUser;
  users &&
    users.map((myUser) => {
      products &&
        products.map((product) => {
          if (myUser._id === product.user) {
            myUser.role === "vendor"
              ? filteredFarmerProducts.push(product)
              : filteredBuyerProducts.push(product);
          }

          return "";
        });
      return "";
    });
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Kisan Sahulat" />

          <CarouselComponent />

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {user && (user.role === "admin" || user.role === "vendor")
              ? navigate("/admin/dashboard")
              : user && user.role === "farmer"
              ? filteredFarmerProducts &&
                filteredFarmerProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              : filteredBuyerProducts &&
                filteredBuyerProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
          </div>
          <About />
          <Services />
          <Features />
          <Contact />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
