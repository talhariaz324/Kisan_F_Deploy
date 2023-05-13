import React, {useEffect} from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {  getAllQuestions } from "../../actions/farmerForumAction";


const QuestionList = () => {
  const dispatch = useDispatch();
  const {question}= useSelector((state) => state.allQuestion);
  useEffect(() => {
   
    dispatch(getAllQuestions());
  }, [dispatch]);
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Card>
      <CardHeader className="bg-success text-white text-center " style={{fontWeight: 'bold', fontSize: "2rem"}}>Questions
      <Button tag={Link} to="/farmer-forum/create-question"  color="primary" style={{marginLeft: "2rem"}}>Create Question</Button>
      </CardHeader>
      <CardBody>
        <ListGroup flush>
          {question.map((question) => (
            <ListGroupItem key={question._id} className="border-0">
            <Link to={`/farmer-forum/update-answers0/${question._id}`}>
                <span className="font-weight-bold text-success " style={{fontSize: "1.5rem"}}>{question.question}</span>
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default QuestionList;
