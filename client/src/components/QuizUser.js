import React, {useContext, useEffect, useState}  from 'react'
import CourseContext from '../context/CourseContext';


const QuizUser = () => {
    const context = useContext(CourseContext);
    const {videocontext} = context;

    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [video, setVideo] = useState({source: ""});
    const [timeLeft, setTimeLeft] = useState(50);
    const [result, setResult] = useState(0);

    let interval;

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

            if(timeLeft===0){
                console.log("TIME LEFT IS 0");
                setTimeLeft(null)
             }
         
             // exit early when we reach 0
             if (!timeLeft) return;
         
             // save intervalId to clear the interval when the
             // component re-renders
             const intervalId = setInterval(() => {
         
               setTimeLeft(timeLeft - 1);
             }, 1000);
         
             // clear interval on re-render to avoid memory leaks
             return () => clearInterval(intervalId);
             // add timeLeft as a dependency to re-rerun the effect
             // when we update it
              
              
            }, [timeLeft])
            
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
        document.getElementById('start').style.display="none";
        document.getElementById('end').style.display="";
        document.getElementById('reAttempt').disabled = false;                    
        document.getElementById('submitquiz').disabled = true;                    
    }
    
  return (
    <div style={{height: "100vh", backgroundColor: `url('background.jpg')`}}>

        <div id='timer' style={{position:'absolute',fontSize: "30px" ,right: "30px", fontFamily: "Montserrat", margin: "30px"}}>
            Time left: {timeLeft>=0?timeLeft:0  }
            
        </div>
        <h3 style={{marginTop: "30px"}} id='start'>Quiz has been started! All the best</h3>
        <h3 style={{marginTop: "30px", display: "none"}} id='end'>Quiz is ended. You scored {result}%</h3>

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
        <div style={{textAlign: "center"}}> 
            <button id='submitquiz' className='btn btn-primary mx-3 my-5' onClick={handleSubmit} disabled={timeLeft>0?false:true} >Submit</button>
            <button id='reAttempt' className='btn btn-primary mx-3 my-5' onClick={handleReattempt} disabled={timeLeft>0?true:false}  >Re-attempt</button>
        </div>

    </div>
  )
}

export default QuizUser