import React, {useContext, useEffect, useState}  from 'react'
import CourseContext from '../context/CourseContext';
import { useNavigate } from 'react-router-dom'

const Instructions = () => {
    const navigate = useNavigate();

    const context = useContext(CourseContext);
    const {videocontext} = context;
    const [video, setVideo] = useState({source: ""});

    useEffect(() => {
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
                setVideo(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const handleStart= ()=>{
        console.log("Start quiz");
        navigate('/course/video/player/quiz/start')
    }
    


  return (
<div>
        <div style={{textAlign: "center", fontFamily: "Montserrat"}}>
            <h2>{video.title}</h2>
            <h2>{video.description}</h2>
            <hr />
        </div>

        <div>
            <h3>Instructions:</h3>
            <ul style={{fontSize: "1.2rem"}}>
                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit et repudiandae temporibus quos quo aspernatur debitis tempora consequuntur unde quia veritatis natus numquam eos repellendus vero quas, saepe expedita at eligendi fugiat sint culpa. Libero temporibus, voluptatem officia sed rem magnam! Delectus fuga nisi, aspernatur cupiditate officia asperiores maiores magnam.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, hic quibusdam repellat quisquam tempora nisi dolor sunt. Accusamus sed aliquam repudiandae magnam, soluta possimus consectetur, aut ad rem, optio maxime.</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, voluptates doloribus sequi blanditiis nisi necessitatibus dolor aperiam? Laborum atque animi molestias voluptas amet enim sint.</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, voluptatibus a! Iste cumque aperiam quo?</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, debitis cupiditate incidunt itaque unde, molestias facilis fuga distinctio est ducimus excepturi minima tempora veritatis.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, debitis cupiditate incidunt itaque unde, molestias facilis fuga distinctio est ducimus excepturi minima tempora veritatis.</li>
            </ul>
        </div>

        <div style={{textAlign:"center"}}>
            <button className='btn btn-primary' onClick={handleStart}>Start</button>
        </div>


    </div>
  )
}

export default Instructions