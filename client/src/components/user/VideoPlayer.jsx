import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useNavigate } from "react-router-dom";

import "../../css/user/react-player.css";

const VideoPlayer = (props) => {
  // const url = "https://www.youtube.com/watch?v=WQBldOTxN4M";
  return (
    <div className="player-wrapper" style={{}}>
      <ReactPlayer
        url={props.video.vdoSrc}
        controls={true}
        className="react-player"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
