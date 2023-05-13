import "./App.css";
import Header from "./components/layout/Header/Header.js";
import AdminHeader from "./components/layout/Header/AdminHeader.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";

import React, {useState, Fragment, useEffect } from "react";
import Footer from "./components/layout/Footer/Footer";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatedPassword from "./components/User/UpdatedPassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import MessageDetails from "./components/Admin/MessageDetails.js";
import UsersList from "./components/Admin/UsersList";
import Messages from "./components/Admin/Messages.js";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound.js";
import Services from "./components/layout/Services/Services";
import { Fab } from "@material-ui/core";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import QuestionList from "./components/Farmer_Forum.js/questions";
import QuestionForm from "./components/Farmer_Forum.js/create-question";
import QuestionDetails from "./components/Farmer_Forum.js/question_details";
import AnswerForm from "./components/Farmer_Forum.js/create-answer";
import Weather from "./components/weather";
import LocationG from "./components/Location";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${process.env.Backend_URL}/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <div>
      <BrowserRouter>
    
        {user && (user.role === "vendor" || user.role === "admin") ? (
          <AdminHeader user={user} />
        ) : (
          <Header />
        )}

        <Fragment>
          <Elements stripe={loadStripe(stripeApiKey)}>

          <Routes>
            <Route
              exact
              path="/"
              element={
                !isAuthenticated ? (
                  <Home />
                ) : isAuthenticated &&
                  user &&
                  (user.role === "farmer" || user.role === "buyer") ? (
                  <Home user={user} />
                ) : (
                  <Dashboard user={user} />
                )
              }
            />
            <Route
              exact
              path="/farmer-forum/all-questions"
              element={
              isAuthenticated &&
                  user &&
                  (user.role === "farmer") ? (
                  <QuestionList/>
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              exact
              path="/product/:id"
              element={<ProductDetails user={user} />}
            /> 
            <Route
              exact
              path="/weather"
              element={isAuthenticated &&
                  user &&
                  (user.role === "farmer") ? (
                  <Weather/>
                ) : (
                  <NotFound />
                )}
            /> 
            <Route
              exact
              path="/location"
              element={isAuthenticated &&
                  user &&
                  (user.role === "farmer") ? (
                  <LocationG/>
                ) : (
                  <NotFound />
                )}
            /> 
            <Route
              exact
              path="/farmer-forum/create-question"
              element={<QuestionForm />}
            />
            <Route
              exact
              path="/farmer-forum/update-answers0/:id"
              element={<QuestionDetails />}
              
            /> 
         
            
            <Route
              exact
              path="/farmer-forum/update-answers/:id"
              element={<AnswerForm />}
            />
            <Route exact path="/products" element={<Products user={user} />} />
            <Route
              path="/products/:keyword"
              element={<Products user={user} />}
            />
            <Route
              exact
              path="/search"
              element={
                !user ||
                (user && (user.role === "farmer" || user.role === "buyer")) ? (
                  <Search />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route exact path="/login" element={<LoginSignUp />} />
            {/* <Route
              exact
              path="/userOptions"
              element={isAuthenticated && <UserOptions user={user} />}
            /> */}
            <Route
              exact
              path="/contact"
              element={
                !user ||
                (user && (user.role === "farmer" || user.role === "buyer")) ? (
                  <Contact />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              exact
              path="/about"
              element={
                !user ||
                (user && (user.role === "farmer" || user.role === "buyer")) ? (
                  <About />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/services"
              element={
                !user ||
                (user && (user.role === "farmer" || user.role === "buyer")) ? (
                  <Services />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route
              exact
              path="/cart"
              element={
                !user ||
                (user && (user.role === "farmer" || user.role === "buyer")) ? (
                  <Cart user={user} />
                ) : (
                  <NotFound />
                )
              }
            />
            {/* 

Change permissons on each route.
And make sure unAuth user == login
and farmer and buyer == home
and admin and vendor == adminDashboard */}

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatedPassword />} />
              <Route exact path="/login/shipping" element={<Shipping />} />
              <Route exact path="/order/confirm" element={<ConfirmOrder />} />
              {stripeApiKey && (
                  <Route exact path="/process/payment" element={<Payment />} />
                )}
              <Route exact path="/orders" element={<MyOrders />} />
              <Route exact path="/success" element={<OrderSuccess />} />
              <Route exact path="/order/:id" element={<OrderDetails />} />
              <Route
                exact
                path="/admin/dashboard"
                element={<Dashboard user={user} />}
              />
              <Route
                exact
                path="/admin/products"
                element={<ProductList user={user} />}
              />
              <Route
                exact
                path="/vendor/product"
                element={<NewProduct user={user} />}
              />
              <Route
                exact
                path="/vendor/product/:id"
                element={<UpdateProduct />}
              />
              <Route
                exact
                path="/admin/orders"
                element={<OrderList user={user} />}
              />
              <Route
                exact
                path="/admin/order/:id"
                element={<ProcessOrder user={user} />}
              />
              <Route
                exact
                path="/admin/messages/:id"
                element={<MessageDetails />}
              />
              <Route exact path="/admin/users" element={<UsersList />} />
              <Route exact path="/admin/messages" element={<Messages />} />
              <Route exact path="/admin/user/:id" element={<UpdateUser />} />
              <Route exact path="/admin/reviews" element={<ProductReviews />} />
            </Route>
          </Routes>
          </Elements>
        </Fragment>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
Redux Working:

Make store.
Make constants
Make Reducers (use them in store)
Make Actions (This is where have url)
Then 
In index.js wrap with provider (Whole wrap with one argument)
Then 
package.json of frontend add proxy with your frontend localhost to after : port of backend


After That in home.js or where you want ,,, you can use them by using some imports as you can check at the redux commit in git.



At the end,,, You have to run the backend and frontend both by spliting the terminal. 
First run backend and then frontend.... But necessary
*/
