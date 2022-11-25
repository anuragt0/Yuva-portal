import React, {useContext, useEffect, useState}  from 'react'
import CourseContext from '../context/CourseContext';


const QuizUser = () => {
    const context = useContext(CourseContext);
    const {videocontext} = context;

    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [video, setVideo] = useState({source: ""});
    const [time, setTime] = useState(15);
    const [result, setResult] = useState(0);

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
            
    const handleReattempt = ()=>{
        console.log("Reattempt");
    }
    const handleSubmit = ()=>{
        // e.preventDefault();
        // SCORE IS CALCULATED
        console.log('calculate results');
        let score = 0;
        for(let i = 0; i<questions.length; i++){
            if(document.getElementsByClassName(`question${i}`)[questions[i].correctOption-1].checked){
                score++;
            }
        }
        const correctAnswers = score;
        const totalQuestions = questions.length;
        const percentage = (correctAnswers/totalQuestions*100).toFixed(2);
        console.log("You scored ", percentage);
        setResult(percentage);
        // document.getElementById('result').style.display = "";
        document.getElementById('quiz').style.display = "none";
        document.getElementById('timer').style.display = "none";
        document.getElementById('submitquiz').style.disabled=true;
                    
    }
    
  return (
    <div style={{height: "100vh", backgroundColor: `url('background.jpg')`}}>

        <div id='timer' style={{position:'absolute',fontSize: "30px" ,right: "30px", fontFamily: "Montserrat", margin: "30px"}}>
            Time left: {time>=0?time:0  }
        </div>
        <h3 style={{marginTop: "30px"}} id='start'>Quiz has been started! All the best</h3>
        {result}
        {/* <h3 style={{marginTop: "30px", display: "none"}} id='result'>
                        Quiz is over. You scored ${result}%
                        <hr/>
                        <button className='btn btn-primary' onClick={handleReattempt}>Re-attempt</button> 
        </h3> */}

        {/* style={{display: time<=0?"none":""}} */}
        <div id='quiz' name='quiz' style={{marginTop: "80px", fontSize: "20px"}}>
            <form name='quiz' id='quiz'>
                {
                    questions.map((question, index)=>{
                        return <div>
                            <p>{index+1}. {question.question}</p>
                            <div id='options' style={{paddingLeft: "20px"}}>
                                <p><input  type="radio" className={`question${index}`} name={`question${index}`} value={1}/> &nbsp; A. {options[index*4]}</p>
                                <p><input type="radio" className={`question${index}`} name={`question${index}`} value={2}/>&nbsp; B. {options[index*4+1]}</p>
                                <p><input type="radio" className={`question${index}`} name={`question${index}`} value={3}/>&nbsp;C. {options[index*4+2]}</p>
                                <p><input type="radio" className={`question${index}`} name={`question${index}`} value={4}/>&nbsp; D. {options[index*4+3]}</p>
                            </div>
                        </div>
                    })
                }            
            </form>

        </div>
        <button id='submitquiz' className='btn btn-primary' onClick={handleSubmit} disabled={time>0?false:true} >Submit</button>
        <button id='reAttempt' className='btn btn-primary' onClick={handleReattempt} disabled={true}  >Re-attempt</button>

    </div>
  )
}

export default QuizUser