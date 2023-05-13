import { React, useState } from "react";
import "./AdminHeader.css";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
function AdminHeader(props) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    // debugger;
    setIsOpen(!isOpen);
  };
  return (
    <div className="greetings d-flex justify-content-between m-2">
      <p>Welcome, {user.name}!</p>

      {isAuthenticated && <UserOptions user={user} toggler={toggle} />}
    </div>
  );
}

export default AdminHeader;
