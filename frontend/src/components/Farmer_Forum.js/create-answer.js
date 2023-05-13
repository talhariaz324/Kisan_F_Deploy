import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { updateAnswers } from "../../actions/farmerForumAction";
import {  useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {  getAllQuestions } from "../../actions/farmerForumAction";
const AnswerForm = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    // const navigate = useNavigate();
    const { id } = useParams();
    const {question}= useSelector((state) => state.allQuestion);
  var questionData;
  question.map((question)=>   {
    if(question._id === id) {
      questionData = question;
    }
    console.log(questionData)
    
  })
    useEffect(() => {
   
        dispatch(getAllQuestions());
      }, [dispatch]);


    const [name] = useState(questionData.name);
    const [email] = useState(questionData.email);
    const [phone] = useState(questionData.phone);
    const [question1] = useState(questionData.question);
    const [answers, setAnswers] = useState("");
   
  
    const createAnswerSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("phone", phone);
      myForm.set("question", question1);
      myForm.set("answers", answers);
  
      dispatch(updateAnswers(id,myForm));
      alert.show("Answer Submitted Successfully", { timeout: 2000 });
    };
  
   
  return (
    <Form className='p-5' onSubmit={createAnswerSubmitHandler}>
     
      <FormGroup>
        <Label for="answer">Answer</Label>
        <Input
          type="textarea"
          name="answer"
          id="answer"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          placeholder="Enter your Answer"
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AnswerForm;
