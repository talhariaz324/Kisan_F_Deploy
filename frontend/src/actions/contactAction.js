import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  ALL_CONTACT_REQUEST,
  ALL_CONTACT_SUCCESS,
  ALL_CONTACT_FAIL,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_DETAILS_REQUEST,
  CLEAR_ERRORS,
} from "../constants/contactConstant";
import axios from "axios";

// Create Contact

export const createContact = (contacts) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CONTACT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${process.env.Backend_URL}/api/v1/contact`, contacts, config);
    dispatch({
      type: CREATE_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details

export const getAllContacts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_CONTACT_REQUEST,
    });

    const { data } = await axios.get(`${process.env.Backend_URL}/api/v1/admin/messages`);

    dispatch({
      type: ALL_CONTACT_SUCCESS,
      payload: data.contacts,
    });
  } catch (error) {
    dispatch({
      type: ALL_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getContactDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CONTACT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${process.env.Backend_URL}/api/v1/admin/messages`);
    console.log(data);
    dispatch({
      type: CONTACT_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
