import React, {useEffect} from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
// import { createQuestion } from "../../actions/farmerForumAction";
import { Link,  useParams } from "react-router-dom";
import {  getAllQuestions } from "../../actions/farmerForumAction";

const QuestionDetails = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { id } = useParams();
  const {question}= useSelector((state) => state.allQuestion);
  var questionData;
  question.map((question)=>   {
    if(question._id === id) {
      questionData = question;
    }
    
  })
  useEffect(() => {
 
      dispatch(getAllQuestions());
    }, [dispatch]);

  return (
    <Card>
      <CardHeader className="bg-success text-white text-center " style={{fontWeight: 'bold', fontSize: "2rem"}}>Question Details
      <Button tag={Link} to= {`/farmer-forum/update-answers/${id}`}  color="primary" style={{marginLeft: "2rem"}}>Create Answer</Button>
      </CardHeader>
      <CardBody>
        <ListGroup flush>

            <ListGroupItem className="border-0">
            {/* <Link to={'/farmer-forum/questionDetails'}> */}
          {  questionData.answers.map((answer)=> <p className="font-weight-bold text-success " style={{fontSize: "1.5rem"}}>{answer}</p>)}
                
              {/* </Link> */}
            </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default QuestionDetails;
