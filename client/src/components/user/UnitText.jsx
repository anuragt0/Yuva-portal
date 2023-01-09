import React from "react";

const UnitText = (props) => {
    let textLenthInWords = props.text.split(" ").length;
    const averageReadSpeedInMin = 200;
    const timeToRead = (textLenthInWords/averageReadSpeedInMin).toFixed(1);
    
  return( 
    <div>
        <div className="container" style={{ textAlign:"right"}}>
            <span>(approx time to read: <b>{timeToRead}</b> min )</span>
        </div>
        <p style={{ fontSize:"1.5em"}}>{props.text}</p>
    </div>
  )
};

export default UnitText;
