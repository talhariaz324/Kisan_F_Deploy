import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { getAllUsers } from "../../actions/userAction.js";
import { useNavigate } from "react-router-dom";
const categories = ["Machines", "Seeds", "Crops"];

const Products = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  // console.log(resultsPerPage);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  // let count = filteredProductsCount; // Trying to removing the pagination after filter but there was issue so we comment filter..

  const { keyword } = useParams(); // Destruct it must
  useEffect(() => {
    if (error) {
      alert.show(error, { timeout: 2000 });
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    dispatch(getAllUsers());
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

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
          <MetaData title="PRODUCTS -- Kisan Sahulat" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {user && (user.role === "admin" || user.role === "vendor")
              ? navigate("/admin/dashboard")
              : user && user.role === "farmer"
              ? filteredFarmerProducts &&
                filteredFarmerProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              : filteredBuyerProducts &&
                filteredBuyerProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          <div className="filterBox">
            <div
              className="typography"
              style={{
                color: "white",
                backgroundColor: "#097969",
                paddingLeft: "10px",
              }}
            >
              Price
            </div>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <div
              className="typography"
              style={{
                color: "white",
                backgroundColor: "#097969",
                paddingLeft: "10px",
              }}
            >
              Categories
            </div>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            
              <div
                className="typography"
                style={{
                  color: "white",
                  backgroundColor: "#097969",
                  paddingLeft: "10px",
                }}
              >
                Rating
              </div>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            
          </div>
          {resultsPerPage < productsCount && ( // If condition true then show otherwise nothing show,
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                secondPageText="2nd"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
