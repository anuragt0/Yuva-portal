import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
// My components
import SecCard from "../../components/common/SecCard";
import VideoInput from "../../components/admin/VideoInput";
import TextInput from "../../components/admin/TextInput";
import ActivityInput from "../../components/admin/ActivityInput";
import QuizInput from "../../components/admin/QuizInput";

// My css
import "../../css/admin/a-add-unit-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";

// TODO: VALIDATION
// ! check response codes

const DEFAULT_QUIZ_ITEM_OBJ = {
  question: "",
  options: [
    { text: "", isChecked: false },
    { text: "", isChecked: false },
    { text: "", isChecked: false },
    { text: "", isChecked: false },
  ],
};

////////////////////////////////////////////////////////////////////////////////////////////////

function AddActivityBtn(props) {
  return (
    <div style={{ marginBottom: "2rem", textAlign: "center" }}>
      <button
        className="a-add-unit-page-btn"
        type="button"
        onClick={() => props.handleAddActivity()}
      >
        Add activity
      </button>
    </div>
  );
}
//////////////////////////////////////// QUIZ ///////////////////////////////////////////////////

function AddQuizItemBtn(props) {
  return (
    <div style={{ marginBottom: "2rem", textAlign: "center" }}>
      <button
        className="a-add-unit-page-btn"
        type="button"
        onClick={() => props.handleAddQuizItem()}
      >
        Add question
      </button>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////

const AdminAddUnit = () => {
  const [video, setVideo] = useState({ title: "", desc: "", vdoSrc: "" });
  const [text, setText] = useState("");
  const [activities, setActivities] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const [isAddUnitBtnDisabled, setIsAddUnitBtnDisabled] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  //////////////////////////////////////////////////////////////////////////////

  function onVideoChange(e) {
    setVideo((prevVideo) => {
      const newVideo = { ...prevVideo, [e.target.name]: e.target.value };
      console.log(newVideo);
      return newVideo;
    });
  }

  ///////////////////////////////////////////////////////////////////////////////

  function onTextChange(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  ///////////////////////////////////////////////////////////////////////////////

  function handleActivityChange(i, e) {
    setActivities((prevActivities) => {
      let newActivities = [...prevActivities];
      newActivities[i] = e.target.value;
      console.log(newActivities);

      return newActivities;
    });
  }

  function handleAddActivity() {
    setActivities((prevActivities) => {
      const newActivities = [...prevActivities, ""];
      console.log(newActivities);

      return newActivities;
    });
  }

  function handleDeleteActivity(i) {
    setActivities((prevActivities) => {
      let newActivities = [...prevActivities];
      newActivities.splice(i, 1);
      console.log(newActivities);

      return newActivities;
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  let handleQuizItemChange = (quizItemIdx, optIdx, e) => {
    setQuiz((prevQuiz) => {
      let newQuiz = [...prevQuiz];

      if (e.target.name === "question") {
        newQuiz[quizItemIdx][e.target.name] = e.target.value;
      } else if (e.target.name === "optText") {
        newQuiz[quizItemIdx].options[optIdx].text = e.target.value;
      } else {
        newQuiz[quizItemIdx].options[optIdx].isChecked = e.target.checked;
      }

      console.log(newQuiz);

      return newQuiz;
    });
  };

  let handleAddQuizItem = () => {
    setQuiz((prevQuiz) => {
      let newQuiz = [
        ...prevQuiz,
        {
          question: "",
          options: [
            { text: "", isChecked: false },
            { text: "", isChecked: false },
            { text: "", isChecked: false },
            { text: "", isChecked: false },
          ],
        },
      ];
      // console.log(newQuiz);

      return newQuiz;
    });
  };

  let handleDeleteQuizItem = (quizItemIdx) => {
    setQuiz((prevQuiz) => {
      let newQuiz = [...prevQuiz];
      newQuiz.splice(quizItemIdx, 1);

      console.log(newQuiz);

      return newQuiz;
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  async function handleAddUnit() {
    // setIsAddUnitBtnDisabled(true);
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
      setIsAddUnitBtnDisabled(false);

      // navigate(`/admin/verticals/${verticalId}/courses/${courseId}/units/all`);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="a-add-unit-page-outer-div">
      <div>
        <h1 className="text-ff1 text-center my-5">
          Adding a new unit for course
        </h1>
      </div>
      <div className="a-add-unit-page-sec-div">
        <SecCard>
          <h2 className="text-ff1">Video</h2>
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
        </SecCard>
      </div>

      <div className="a-add-unit-page-sec-div">
        <SecCard>
          <h2 className="text-ff1">Text</h2>
          <TextInput
            name="text"
            id="text"
            label="Text"
            placeholder="..."
            value={text}
            onChange={onTextChange}
          />
        </SecCard>
      </div>

      <div className="a-add-unit-page-sec-div">
        <SecCard>
          <h2 className="text-ff1">Activities</h2>
          <AddActivityBtn handleAddActivity={handleAddActivity} />

          {activities.map((activity, index) => (
            <ActivityInput
              key={index}
              index={index}
              handleActivityChange={handleActivityChange}
              handleDeleteActivity={handleDeleteActivity}
              value={activity}
            />
          ))}
        </SecCard>
      </div>

      <div className="a-add-unit-page-sec-div">
        <SecCard>
          <h2 className="text-ff1">Quiz</h2>

          <AddQuizItemBtn handleAddQuizItem={handleAddQuizItem} />

          {quiz.map((quizItem, quizItemIdx) => (
            <QuizInput
              key={quizItemIdx}
              quizItemIdx={quizItemIdx}
              handleQuizItemChange={handleQuizItemChange}
              handleDeleteQuizItem={handleDeleteQuizItem}
              quizItem={quizItem}
            />
          ))}
        </SecCard>
      </div>

      <div style={{ margin: "2rem", textAlign: "center" }}>
        <button
          disabled={isAddUnitBtnDisabled}
          className="a-add-unit-page-btn"
          onClick={handleAddUnit}
        >
          Add Unit
        </button>
      </div>
    </div>
  );
};

export default AdminAddUnit;
