import React, {useContext, useEffect, useState}  from 'react'
import CourseContext from '../context/CourseContext';


const QuizUser = () => {
    const context = useContext(CourseContext);
    const {videocontext} = context;

    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [video, setVideo] = useState({source: ""});
    const [time, setTime] = useState(5);

    const[quizover, setQuizover] = useState(false);

    useEffect(() => {
        console.log("questions: ", questions);
        console.log("options: ", options);

        fetch(`http://localhost:5000/api/getquiz`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
                body: JSON.stringify({"videoID": videocontext})
            })
            .then((response) => response.json())
            .then((dataa) => {
                // console.log("Got the Video: ");
                console.log("dataa", dataa);
                setQuestions(dataa.questions);
                setOptions(dataa.options);
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            fetch(`http://localhost:5000/api/getvideobyid`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
                body: JSON.stringify({"videoID": videocontext})
            })
            .then((response) => response.json())
            .then((dataa) => {
                console.log("Got the Video: ");
                console.log(dataa);
                setVideo(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            const interval = setInterval(() => {
                if(time>0){
                    setTime((t)=>{
                        return t-1;
                    })
                }
              }, 1000)
            
    
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert("Submit quiz");
    }
    
  return (
    <div>
        <div id='timer' style={{position:'absolute',fontSize: "30px" ,right: "30px", fontFamily: "Montserrat", margin: "30px"}}>
            Time left: {time>=0?time:0  }
        </div>
        <h3 style={{marginTop: "30px"}}>Quiz has been started! All the best</h3>

        {/* style={{display: time<=0?"none":""}} */}
        <div id='quiz' style={{marginTop: "80px", fontSize: "20px"}}>
            <form name='quiz' id='quiz'>
                {
                    questions.map((question, index)=>{
                        return <div>
                            <p>{index+1}. {question.question}</p>
                            <div id='options' style={{paddingLeft: "20px"}}>
                                <p><input  type="radio" name="1" value={1} disabled={time>0?false:true} /> &nbsp; A. {options[index*4]}</p>
                                <p><input type="radio" name="2" value={2}disabled={time>0?false:true} />&nbsp; B. {options[index*4+1]}</p>
                                <p><input type="radio" name="3" value={3}disabled={time>0?false:true} />&nbsp;C. {options[index*4+2]}</p>
                                <p><input type="radio" name="4" value={4}disabled={time>0?false:true} />&nbsp; D. {options[index*4+3]}</p>
                            </div>
                        </div>
                    })
                }
                <button id='submitquiz' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            
            </form>

        </div>

    </div>
  )
}

export default QuizUser