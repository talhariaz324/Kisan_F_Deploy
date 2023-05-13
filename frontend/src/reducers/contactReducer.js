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

export const newContactReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CONTACT_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_CONTACT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allMessagesReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case ALL_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_CONTACT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };

    case ALL_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const contactDetailsReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case CONTACT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case CONTACT_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CONTACT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
