import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

function UnitInput(props) {
  return (
    <div class="form-group row profile">
      <label for={props.id} class="col-sm-2 col-form-label">
        {props.label}
      </label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}

function ActivityInput(props) {
  //   console.log(props.index);
  function handleDelete(e) {
    // console.log(e.target);
    // console.log(e.target.value);
    const index = e.target.value;

    // console.log(props.delete);
    props.delete(index);
  }

  return (
    <>
      <UnitInput name="title" id="title" label="Title" placeholder="Title" />
      <button onClick={handleDelete} value={props.position}>
        - {props.position}
      </button>
    </>
  );
}

function Activity() {
  const [activities, setActivities] = useState([]);
  function handleDeleteActivity(index) {
    setActivities((prevActivities) => {
      console.log(index);

      return prevActivities.filter((activity, pos) => {
        return index != pos;
      });
    });

    console.log(activities.length);
  }
  useEffect(() => {}, [activities]);

  function handleAddActivity() {
    // dont keep key = index, as indexes might become same on deletion
    setActivities((prevActivities) => {
      const newActivity = (
        <ActivityInput
          position={prevActivities.length}
          key={prevActivities.length}
          delete={handleDeleteActivity}
        />
      );

      return [...prevActivities, newActivity];
    });
  }

  return (
    <>
      <h1>Activity</h1>
      <button onClick={handleAddActivity}>+</button>
      {activities.map((activity) => {
        return activity;
      })}
    </>
  );
}

const AdminAddUnit = () => {
  return (
    <>
      <Activity />

      <h1>Video</h1>
      <UnitInput name="title" id="title" label="Title" placeholder="Title" />
      <UnitInput
        name="desc"
        id="desc"
        label="Description"
        placeholder="Description"
      />
      <UnitInput
        name="vdoSrc"
        id="video-src"
        label="Source"
        placeholder="https://youtube.com...."
      />

      <h1>Text</h1>
      <textarea
        name="text"
        id="text"
        label="Text"
        placeholder="Text"
        rows={10}
        cols={100}
      />
    </>
  );
};

export default AdminAddUnit;
