import React, { useEffect } from 'react';
import { useState } from 'react';
import CourseStructure from './CourseStructure';


const Courses = () => {
    const host = 'http://localhost:5000';
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch(`${host}/api/getcourses`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((dataa) => {
                console.log("Got the courses: ");
                console.log(dataa);
                setCourses(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    }, [])
    
  return (
        <>
            <h1 style={{padding: "30px"}}>Available courses-</h1>

            {
                courses.map((course)=>{
                    return <CourseStructure key = {course._id} course={course}/>
                })
            }

        </>
  )
}

export default Courses

// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import VideoStruc from './VideoStruc';

// const Home = () => {
//     const navigate = useNavigate();
//     const [videos, setVideos] = useState([]);
//     const [user, setUser] = useState();
//     const videoTime = [];
//     const [videoID, setVideoID] = useState("");

//     // const [playtime, setPlayTime] = useState(0);
//     // const [pausetime, setPauseTime] = useState(0);

//     // const [time, setTime] = useState({});
//     // let tempTime;
    
//     useEffect(() => {
//         // console.log(document.getElementsByClassName("video"));
//         if(!localStorage.getItem('token')){
//             alert("Please login first");
//             navigate('/login');
//         } 
//         fetch(`http://localhost:5000/api/getvideos`, {
//             method: 'GET', 
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             // body: JSON.stringify(data),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log('Success:', data);
//             setVideos(data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });

//         //GETTING USER
//         fetch(`http://localhost:5000/api/auth/getuser`, {
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': localStorage.getItem('token')
//             },
//         })
//         .then((response) => {return response.json()})
//         .then((data) => {
//             // console.log('Success:', data);
//             setUser(data._id);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     }, [])

//     var player, playing = false;
//     function onYouTubeIframeAPIReady() {
//         player = new YT.Player('video', {
//             height: '360',
//             width: '640',
//             videoId: 'DlKl8me4Npw',
//             events: {
//                 'onStateChange': onPlayerStateChange
//             }
//         });
//     }

//     function onPlayerStateChange(event) {

//       if (event.data == YT.PlayerState.PLAYING) {
//          alert('video started');
//          playing = true;
//         }

//       else if(event.data == YT.PlayerState.PAUSED){
//             alert('video paused');
//             playing = false;
//        }
// }

//   return (
//  <div className="Home">


// <div class="module module-home-video">
//     <span class="module-strip">Latest Product Video</span>
//     <div id="video"></div>
// </div>

//       {/* <h1>Videos: </h1>
//       {videos.map((video)=>{
//             return <VideoStruc key={video._id} user = {user} video={video}/>
//         })} */}
    
//  </div> 
    
//   )
// }

// export default Home;