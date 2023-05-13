import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { createQuestion } from "../../actions/farmerForumAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const QuestionForm = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [question, setQuestion] = useState("");
   
  
    const createProductSubmitHandler = async (e) =>  {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("phone", phone);
      myForm.set("question", question);
  
      dispatch(createQuestion(myForm));
      alert.show("Question Submitted Successfully", { timeout: 2000 });
    };
  
   
  return (
    <Form className='p-5' onSubmit={createProductSubmitHandler}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="question">Question</Label>
        <Input
          type="textarea"
          name="question"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default QuestionForm;
