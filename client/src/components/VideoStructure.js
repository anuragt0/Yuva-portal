import React, {useContext} from 'react'
import CourseContext from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';

const VideoStructure = (props) => {
    const videourl = props.video.source;
    const  navigate = useNavigate();
    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    const videoCode = youtube_parser(videourl);
    const context = useContext(CourseContext);
    const {videoContext, setVideoContext} = context;
    
    
    const handleVideoPlay = ()=>{
        console.log("Play video with id: ", props.video._id);
        setVideoContext(props.video._id);
        if(!localStorage.getItem('token')){
            alert("You need to login to play any video");
            navigate('/login');
            return ;
        }
        navigate("/course/video/player");

    }

  return (
    <div className="card border-dark mb-3" style={{maxWidth: "540px", margin: "50px", marginLeft: "100px"}}>
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={`https://img.youtube.com/vi/${videoCode}/hqdefault.jpg`} className="card-img align-baseline" style={{marginTop: "15px"}} alt="image"/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{props.video.title}</h5>
          <p className="card-text">{props.video.description}</p>
          <button onClick={handleVideoPlay} className='btn btn-primary'>Play video</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default VideoStructure