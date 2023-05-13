import {
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAIL,
    ALL_QUESTION_REQUEST,
    ALL_QUESTION_SUCCESS,
    ALL_QUESTION_FAIL,
    UPDATE_ANSWERS_FAIL,
    UPDATE_ANSWERS_SUCCESS,
    UPDATE_ANSWERS_REQUEST,
    CLEAR_ERRORS,
  } from "../constants/farmerForumConstants";
  
  export const newQuestionReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_QUESTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_QUESTION_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        //   question: action.payload,
        };
  
      case CREATE_QUESTION_FAIL:
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
  
  export const allQuestionReducer = (state = { question: [] }, action) => {
    switch (action.type) {
      case ALL_QUESTION_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ALL_QUESTION_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          question: action.payload,
        };
  
      case ALL_QUESTION_FAIL:
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
  


export const updateAnswersReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ANSWERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_ANSWERS_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case UPDATE_ANSWERS_FAIL:
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