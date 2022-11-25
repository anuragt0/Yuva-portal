import {React, useContext, useEffect, useState, useRef} from 'react'
import courseContext from '../context/CourseContext';

const QuizAdmin = () => {
    const context = useContext(courseContext);
    const {quizVideoID} = context;
    const [quiz, setQuiz] = useState({questions: [], options: []});
    const [video, setVideo] = useState({title: "", description: ""});
    const ref3 = useRef(null);
    const refClose3 = useRef(null);
    const [newQuestion, setNewQuestion] = useState({videoID: quizVideoID, question: "", option1: "",option2: "",option3: "",option4: "",correctoption: "" });

    useEffect(() => {      
        fetch(`http://localhost:5000/api/getquiz`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        },
            body: JSON.stringify({"videoID": quizVideoID})
        })
        .then((response) => response.json())
        .then((dataa) => {
            setQuiz(dataa);
            console.log(dataa);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        fetch(`http://localhost:5000/api/getvideobyid`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        },
            body: JSON.stringify({"videoID": quizVideoID})
        })
        .then((response) => response.json())
        .then((dataa) => {
            setVideo(dataa);
            console.log("dataa: ", dataa);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    }, [])

    const handleAddQuiz = ()=>{
        ref3.current.click();
    }

    const handleAddQuestionConfirm = (e)=>{
        e.preventDefault();
        console.log("New question is: ", newQuestion);
        fetch(`http://localhost:5000/api/auth/uploadquestion`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newQuestion),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("here: ", data);
            // alert("Adding the new area")
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        refClose3.current.click();
    }
    const onChange2 = (e)=>{
        setNewQuestion({...newQuestion,videoID: quizVideoID ,[e.target.name]: e.target.value})
    }
    

  return (
    <div>

        {/* Modal for Adding quiz question */}
      <button
        ref={ref3}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal3"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel" style={{"color": "red"}}>
                <b>Add quiz question</b> 
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    name="question"
                    minLength={3}
                    onChange={onChange2}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="option1" className="form-label">
                    Option 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="option1"
                    name="option1"
                    onChange={onChange2}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="option2" className="form-label">
                    Option 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="option2"
                    name="option2"
                    onChange={onChange2}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="option3" className="form-label">
                    Option 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="option3"
                    name="option3"
                    onChange={onChange2}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="option4" className="form-label">
                    Option 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="option4"
                    name="option4"
                    onChange={onChange2}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="correctoption" className="form-label">
                    Correct option <small>eg. 1,2,3,4</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="correctoption"
                    name="correctoption"
                    onChange={onChange2}
                    required
                  />
                </div>
                
                
                
              </form>
              
              
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose3}
              >
                Close
              </button>
              <button
                onClick={handleAddQuestionConfirm}
                type="button"
                className="btn btn-primary"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>

        <h2>Title: {video.title}</h2> 
        <h3>Description: {video.description}</h3>
        <hr />
        <h3> {quiz?"This video has following quiz questions: ":"There are currently no questions in this video"} </h3>
        <hr />
        <div style={{textAlign:"center"}}>
        <button className='btn btn-primary' onClick={()=>handleAddQuiz()}>Add quiz question</button>

        </div>

        {
            quiz? quiz.questions.map((question, index)=>{
                console.log(question);
                return (<>
                     <p style={{fontSize: "25px"}} > {index+1}- {question.question}</p>
                    <ul style={{listStyleType: "number", fontSize: "20px"}}>
                        <li>{quiz.options[index*4]}</li>
                        <li>{quiz.options[index*4+1]}</li>
                        <li>{quiz.options[index*4+2]}</li>
                        <li>{quiz.options[index*4+3]}</li>
                    </ul>
                    Correct option: <b> {question.correctOption}</b>
                    <p></p>
                    </>
                
                )
                
            }):""
            
        }
    </div>
  )
}

export default QuizAdmin