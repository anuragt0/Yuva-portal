import React, { useEffect, useState } from "react";
import "../../css/admin/admin-verticals.css";
import { useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";

// TODO: VALIDATION

function VideoInput(props) {
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
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
      </div>
    </div>
  );
}

function TextInput(props) {
  return (
    <textarea
      name="text"
      id="text"
      label="Text"
      placeholder="Text"
      rows={10}
      cols={100}
      value={props.value}
      onChange={(e) => {
        props.onChange(e);
      }}
    />
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////

function ActivityInput(props) {
  return (
    <div className="form-inline">
      <label>Name</label>
      <input
        type="text"
        name="activity"
        value={props.value || ""}
        onChange={(e) => props.handleActivityChange(props.index, e)}
      />
      <button
        type="button"
        className="button remove"
        onClick={() => props.deleteActivity(props.index)}
      >
        Remove
      </button>
    </div>
  );
}

function AddActivityBtn(props) {
  return (
    <div className="button-section">
      <button
        className="button add"
        type="button"
        onClick={() => props.addActivity()}
      >
        Add
      </button>
    </div>
  );
}
//////////////////////////////////////// QUIZ ///////////////////////////////////////////////////

function QuizInput(props) {
  return (
    <div className="form-inline">
      <label>Question</label>
      <input
        type="text"
        name="question"
        value={props.quizItem.question || ""}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />
      <br />

      <label>1</label>
      <input
        type="checkbox"
        name="isOption1Checked"
        value={props.quizItem.isOption1Checked || false}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />
      <input
        type="text"
        name="option1"
        value={props.quizItem.option1 || ""}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />

      <label>2</label>
      <input
        type="checkbox"
        name="isOption2Checked"
        value={props.quizItem.isOption2Checked || false}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />
      <input
        type="text"
        name="option2"
        value={props.quizItem.option2 || ""}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />

      <label>3</label>
      <input
        type="checkbox"
        name="isOption3Checked"
        value={props.quizItem.isOption3Checked || false}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />
      <input
        type="text"
        name="option3"
        value={props.quizItem.option3 || ""}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />

      <label>4</label>
      <input
        type="checkbox"
        name="isOption4Checked"
        value={props.quizItem.isOption4Checked || false}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />
      <input
        type="text"
        name="option4"
        value={props.quizItem.option4 || ""}
        onChange={(e) => props.handleQuestionChange(props.index, e)}
      />
      <button
        type="button"
        className="button remove"
        onClick={() => props.deleteQuestion(props.index)}
      >
        Remove
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

function AddQuestionBtn(props) {
  return (
    <div className="button-section">
      <button
        className="button add"
        type="button"
        onClick={() => props.addQuestion()}
      >
        Add
      </button>
    </div>
  );
}

const AdminAddUnit = () => {
  const params = useParams();
  const [video, setVideo] = useState({ title: "", desc: "", vdoSrc: "" });

  function onVideoChange(e) {
    setVideo((prevVideo) => {
      const newVideo = { ...prevVideo, [e.target.name]: e.target.value };
      console.log(newVideo);
      return newVideo;
    });
  }

  ///////////////////////////////////////////////////////////////////////////////

  const [text, setText] = useState("");

  function onTextChange(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  ///////////////////////////////////////////////////////////////////////////////

  const [activities, setActivities] = useState([]);

  function handleActivityChange(i, e) {
    setActivities((prevActivities) => {
      let newActivities = [...prevActivities];
      newActivities[i] = e.target.value;
      console.log(newActivities);

      return newActivities;
    });
  }

  function addActivity() {
    setActivities((prevActivities) => {
      const newActivities = [...prevActivities, ""];
      console.log(newActivities);

      return newActivities;
    });
  }

  function deleteActivity(i) {
    setActivities((prevActivities) => {
      let newActivities = [...prevActivities];
      newActivities.splice(i, 1);
      console.log(newActivities);

      return newActivities;
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  const [quiz, setQuiz] = useState([]);

  let handleQuestionChange = (i, e) => {
    // console.log(e.target.checked);
    setQuiz((prevQuiz) => {
      let newQuiz = [...prevQuiz];
      newQuiz[i][e.target.name] =
        e.target.type === "checkbox"
          ? e.target.checked
            ? true
            : false
          : e.target.value;
      console.log(newQuiz);

      return newQuiz;
    });
  };

  let addQuestion = () => {
    setQuiz((prevQuiz) => {
      let newQuiz = [
        ...prevQuiz,
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          isOption1Checked: false,
          isOption2Checked: false,
          isOption3Checked: false,
          isOption4Checked: false,
        },
      ];
      // console.log(newQuiz);

      return newQuiz;
    });
  };

  let deleteQuestion = (i) => {
    setQuiz((prevQuiz) => {
      let newQuiz = [...prevQuiz];
      newQuiz.splice(i, 1);
      // console.log(newQuiz);

      return newQuiz;
    });
  };

  async function handleAddUnit() {
    const { verticalId, courseId } = params;
    console.log(params);
    try {
      const unit = {
        video: video,
        text: text,
        activities: activities,
        quiz: quiz,
      };

      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/courses/${courseId}/units/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(unit),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h1>Video</h1>
      <VideoInput
        name="title"
        id="title"
        label="Title"
        placeholder="Title"
        value={video.title}
        onChange={onVideoChange}
      />
      <VideoInput
        name="desc"
        id="desc"
        label="Description"
        placeholder="Description"
        value={video.desc}
        onChange={onVideoChange}
      />
      <VideoInput
        name="vdoSrc"
        id="video-src"
        label="Source"
        placeholder="https://youtube.com...."
        value={video.vdoSrc}
        onChange={onVideoChange}
      />

      <h1>Text</h1>
      <TextInput
        name="text"
        id="text"
        label="Text"
        placeholder="..."
        value={text}
        onChange={onTextChange}
      />

      <h1>Activity</h1>
      <>
        <AddActivityBtn addActivity={addActivity} />
        <br />

        {activities.map((activity, index) => (
          <ActivityInput
            key={index}
            index={index}
            handleActivityChange={handleActivityChange}
            deleteActivity={deleteActivity}
            value={activity}
          />
        ))}
      </>

      <h1>Quiz</h1>
      <>
        <AddQuestionBtn addQuestion={addQuestion} />
        <br />

        {quiz.map((quizItem, index) => (
          <QuizInput
            key={index}
            index={index}
            handleQuestionChange={handleQuestionChange}
            deleteQuestion={deleteQuestion}
            quizItem={quizItem}
          />
        ))}
      </>

      <button onClick={handleAddUnit}>+ Add Unit</button>
    </>
  );
};

export default AdminAddUnit;
