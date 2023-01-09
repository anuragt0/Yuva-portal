import React from "react";

const UnitActivities = (props) => {
  // console.log(props);
  return (
    <>
      <div >
        {props.activities.map((activity, index) => {
          return (
            <div key={index} >
            
            <h5 style={{margin:"2%"}}><b>{index+1} - </b>{activity}:</h5>

                <input type="file"  style={{margin:"1%"}}/>
                <button class="btn btn-outline-success" type="button">Submit</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UnitActivities;
