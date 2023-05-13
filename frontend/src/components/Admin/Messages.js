// Copy of user-list for taking same work

import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { getAllContacts, clearErrors } from "../../actions/contactAction";
import LaunchIcon from "@material-ui/icons/Launch";
const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    // if (error) {
    //   alert.show(error, { timeout: 2000 });
    //   dispatch(clearErrors());
    // }

    dispatch(getAllContacts());
  }, [dispatch]);
  const { contacts } = useSelector((state) => state.allContacts);
  let id;
  const columns = [
    { field: "name", headerName: "Name", minWidth: 180, flex: 0.3 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "message",
      headerName: "Messages",
      // minWidth: 100,

      flex: 0.6,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/admin/messages/${id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  contacts &&
    contacts.forEach((item) => {
      id = item._id;
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Contacts</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            // rowHeight={100}
            // rowStyle={{ fontSize: "1.2rem" }}
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Messages;
