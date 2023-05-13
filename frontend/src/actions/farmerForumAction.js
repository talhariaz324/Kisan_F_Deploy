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
  import axios from "axios";
  
  // Create Contact
  
  export const createQuestion = (question) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_QUESTION_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(`${process.env.Backend_URL}/api/v1/farmer-forum/create-question`, question, config);
      dispatch({
        type: CREATE_QUESTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Order Details
  
  export const getAllQuestions = () => async (dispatch) => {
    try {
      dispatch({
        type: ALL_QUESTION_REQUEST,
      });
      
      const { data } = await axios.get(`${process.env.Backend_URL}/api/v1/farmer-forum/all-questions`);
      
      dispatch({
        type: ALL_QUESTION_SUCCESS,
        payload: data.questions,
      });
    } catch (error) {
      dispatch({
        type: ALL_QUESTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
// Update ANSWERS
export const updateAnswers = (id, answersData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ANSWERS_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `${process.env.Backend_URL}/api/v1/farmer-forum/update-answers/${id}`,
        answersData,
        config
      );
  
      dispatch({ type: UPDATE_ANSWERS_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ANSWERS_FAIL,
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
  