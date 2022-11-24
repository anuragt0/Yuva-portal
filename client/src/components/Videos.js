import React from 'react'
import { useEffect, useState } from 'react';
import { useContext } from 'react'
import CourseContext from '../context/CourseContext'
import VideoStructure from './VideoStructure';

const Videos = () => {
    const context = useContext(CourseContext);
    const host = 'http://localhost:5000';

    //course is course id actually
    const {course} = context;

    const [videos, setVideos] = useState([]);

    useEffect(() => {
      
        fetch(`${host}/api/getvideos`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({"courseID": course})
            })
            .then((response) => response.json())
            .then((dataa) => {
                console.log("Got the Videos: ");
                console.log(dataa);
                setVideos(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }, [])
    
  return (
    <div style={{ fontFamily: "Montserrat"}}>
        
        {videos.length==0? <h4 style={{color: "blue", margin: "30px"}}>Looks like videos are not uploaded in this course yet...</h4>: <h1 style={{padding: "30px"}} >Videos: </h1>}
        {
            videos.map((video)=>{
                return (

                    <VideoStructure key={video._id} video={video}/>
                )
            })
        }

    </div>
  )
}

export default Videos