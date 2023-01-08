import React, {useContext}  from 'react'
import CourseContext from '../context/CourseContext';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube'
import { useNavigate } from 'react-router-dom';
import "../Player.css";

const VideoPlayer = () => {
    const context = useContext(CourseContext);
    const {videocontext} = context;
    const [video, setVideo] = useState({source: ""});
    const [user, setUser] = useState({});
    const [duration, setDuration] = useState(0);
    const navigate = useNavigate();

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
                // console.log("Got the Video: ");
                // console.log(dataa);
                setVideo(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
    
    }, [])
    
    let startTime;

    const handlePlay = ()=>{
        console.log("Playing");
        startTime = performance.now();
    }
    const handlePause = ()=>{
        console.log("Paused");
        let time = performance.now()-startTime;
        time/=1000;
        time = Math.floor(time);
        console.log(time);
        
        const data = {"userID": localStorage.getItem('user_id'), "videoID": video._id, "time": time}
        // console.log("data: ", data);

        fetch(`http://localhost:5000/api/increasewatchtime`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((dataa) => {
            console.log("increase watch time: ", dataa);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    const handleTakeQuiz = ()=>{
        navigate('/course/video/player/quiz/instruction')
    }

    const handleDuration = (e)=>{
        console.log("here: ",e.target);
        setDuration(e.target);
    }
    

    return (
        <div style={{ fontFamily: "Montserrat"}}>
        <div style={{margin: "30px",padding: "20px", border: "2px solid"}}>
        <h3 >Title:</h3>
        <div style={{ padding: "20px"}}>
            <h4>{video.title}</h4>
        </div>
        <h3>Description:</h3>
        <div style={{ padding: "20px"}}>
            <h4>{video.description}</h4>
        </div>
        </div>

        <div className="text-center my-5">
        <button type="button" class="btn btn-primary btn-lg " onClick={handleTakeQuiz}><b>Take quiz</b></button>
        </div>
        <div  className='player-wrapper' style={{}}>
        <ReactPlayer url={video.source}  
            onDuration={handleDuration}
            style={{ margin:"100px" }} 
            controls={true} 
            onPlay={handlePlay} 
            onPause={handlePause} 
            className="react-player"
            width="100%"
            height="100%"
         />
        </div>



        </div>
    )
}

export default VideoPlayer