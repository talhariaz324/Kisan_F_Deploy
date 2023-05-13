import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FarmerForumIcon from "@material-ui/icons/AddCircleOutline";
import LocationIcon from "@material-ui/icons/LocationOn";
import WeatherIcon from "@material-ui/icons/Cloud";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import "./UserOptions.css";
import { UncontrolledPopover, PopoverBody, Button } from "reactstrap";
const UserOptions = ({ user, toggler }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#097969" : "unset" }}
        />
      ),
      name: `Cart`,
      func: cart,
    },
    // { icon: <FarmerForumIcon />, name: "farmerForum", func: farmerForum },
    // { icon: <LocationIcon />, name: "location based", func: location_based },
    // { icon: <WeatherIcon />, name: "Weather", func: weather_based },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  const options2 = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  const options3 = [
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  

  if (
    user.role === "admin" ||
    user.role === "vendor"
    
  ) {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
    options2.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
    options3.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }else if (user.role === "farmer"){
    options.unshift(
      {
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    }
    ,{
      icon: <FarmerForumIcon />,
      name: "Farmer Forum",
      func: farmerForum,
    } ,{
      icon: <LocationIcon />,
      name: "Location",
      func: location_based,
    } ,{
      icon: <WeatherIcon />,
      name: "Weather",
      func: weather_based,
    }
    );
  }

  function dashboard() {
    navigate("/admin/dashboard");
    toggle();
    toggler();
  }

  function orders() {
    navigate("/orders");
    toggle();
    toggler();
  }
  function account() {
    navigate("/account");
    toggle();
    toggler();
  }
  function cart() {
    navigate("/cart");
    toggle();
    toggler();
  } 
   function farmerForum() {
    navigate("/farmer-forum/all-questions");
    toggle();
    toggler();
  } 
  function location_based() {
    navigate("/location");
    toggle();
    toggler();
  }function weather_based() {
    navigate("/weather");
    toggle();
    toggler();
  }
  function logoutUser() {
    dispatch(logout());
    alert.show("Logout Successfully", { timeout: 2000 });
    navigate("/login");
    toggle();
    toggler();
  }

  return (
    <div>
      <div id="icon-popover" onClick={toggle}>
        <Button
          color="success"
          id=" floating-icon-button icon-button"
          className=" floating-icon-button p-0"
          // onClick={item.func}
          // title={item.name}
        >
          {
            <img
              className="dpIcon"
              style={{ borderRadius: "50%", width: "60px", height: "60px" }}
              src={
                user.avatar.url
                  ? user.avatar.url
                  : "../../../images/Profile.png"
              }
              alt="Profile"
            />
          }
        </Button>
      </div>
      <UncontrolledPopover
        placement="bottom"
        target="icon-popover"
        isOpen={popoverOpen}
        toggle={toggle}
      >
        <PopoverBody>
          {user.role === "admin"
            ? options3.map((item) => (
                <Button
                  id="icon-button"
                  className="p-0 m-3 success"
                  onClick={item.func}
                  title={item.name}
                >
                  {item.icon}
                </Button>
              ))
            : user.role === "vendor"
            ? options2.map((item) => (
                <Button
                  style={{ marginRight: "2px", marginLeft: "2px" }}
                  id="icon-button"
                  className="p-0 m-3 success"
                  onClick={item.func}
                  title={item.name}
                >
                  {item.icon}
                </Button>
              ))
            : options.map((item) => (
                <Button
                  color="success"
                  id="icon-button"
                  className="p-0 m-1"
                  onClick={item.func}
                  title={item.name}
                >
                  {item.icon}
                </Button>
              ))}
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default UserOptions;
