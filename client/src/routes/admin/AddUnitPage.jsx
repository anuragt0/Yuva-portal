import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// My components
import SecCard from "../../components/common/SecCard";
import VideoInput from "../../components/admin/VideoInput";

// My css
import "../../css/admin/a-add-unit-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";

// TODO: VALIDATION

// function VideoInput(props) {
//   return (
//     <div
//       className="form-group row profile"
//       style={{ margin: 0, marginBottom: "0.8rem" }}
//     >
//       <label
//         for={props.id}
//         className="col-sm-2 col-form-label text-ff2"
//         style={{ paddingLeft: "0" }}
//       >
//         {props.label}
//       </label>
//       <div className="col-sm-10 text-ff2" style={{ padding: 0 }}>
//         <input
//           type="text"
//           className="form-control"
//           id={props.id}
//           name={props.name}
//           placeholder={props.placeholder}
//           value={props.value}
//           onChange={(e) => {
//             props.onChange(e);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

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
    <>
      <div class="input-group my-3">
        <input
          type="text"
          class="form-control"
          id={props.id}
          placeholder="Enter activity"
          aria-describedby="basic-addon2"
          value={props.value || ""}
          onChange={(e) => props.handleActivityChange(props.index, e)}
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-danger"
            type="button"
            onClick={() => props.deleteActivity(props.index)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

function AddActivityBtn(props) {
  return (
    <div className="button-section my-5" style={{ textAlign: "center" }}>
      <button
        className="button add btn btn-primary"
        type="button"
        onClick={() => props.addActivity()}
      >
        Add activity
      </button>
    </div>
  );
}
//////////////////////////////////////// QUIZ ///////////////////////////////////////////////////

function QuizInput(props) {
  return (
    <div className="form-inline">
      <div class="form-group my-5">
        <label for="question">Question</label>
        <input
          type="text"
          class="form-control"
          id="question"
          placeholder="Enter Question"
          name="question"
          value={props.quizItem.question || ""}
          onChange={(e) => props.handleQuestionChange(props.index, e)}
        />
      </div>
      <div className="options">
        <div className="option1 my-3">
          <div style={{ display: "block" }}>
            <span>{1} . </span>
            <input
              className="form-check-input mx-3"
              type="checkbox"
              name="isOption1Checked"
              value={props.quizItem.isOption1Checked || false}
              onChange={(e) => props.handleQuestionChange(props.index, e)}
            />
            <label>
              <input
                type="text"
                name="option1"
                placeholder="Option 1"
                value={props.quizItem.option1 || ""}
                onChange={(e) => props.handleQuestionChange(props.index, e)}
              />
            </label>
          </div>
        </div>

        <div className="option2 my-3">
          <div style={{ display: "block" }}>
            <span>{2} . </span>
            <input
              className="form-check-input mx-3"
              type="checkbox"
              name="isOption2Checked"
              value={props.quizItem.isOption2Checked || false}
              onChange={(e) => props.handleQuestionChange(props.index, e)}
            />
            <label>
              <input
                type="text"
                name="option2"
                value={props.quizItem.option2 || ""}
                placeholder="Option 2"
                onChange={(e) => props.handleQuestionChange(props.index, e)}
              />
            </label>
          </div>
        </div>

        <div className="option3 my-3">
          <div style={{ display: "block" }}>
            <span>{3} . </span>
            <input
              className="form-check-input mx-3"
              type="checkbox"
              name="isOption3Checked"
              value={props.quizItem.isOption3Checked || false}
              onChange={(e) => props.handleQuestionChange(props.index, e)}
            />
            <label>
              <input
                type="text"
                name="option3"
                value={props.quizItem.option3 || ""}
                placeholder="Option 3"
                onChange={(e) => props.handleQuestionChange(props.index, e)}
              />
            </label>
          </div>
        </div>

        <div className="option4 my-3">
          <div style={{ display: "block" }}>
            <span>{4} . </span>
            <input
              className="form-check-input mx-3"
              type="checkbox"
              name="isOption4Checked"
              value={props.quizItem.isOption4Checked || false}
              onChange={(e) => props.handleQuestionChange(props.index, e)}
            />
            <label>
              <input
                type="text"
                name="option4"
                value={props.quizItem.option4 || ""}
                placeholder="Option 4"
                onChange={(e) => props.handleQuestionChange(props.index, e)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="my-5">
        <button
          type="button"
          className="remove btn btn-outline-danger"
          onClick={() => props.deleteQuestion(props.index)}
        >
          Remove this question
        </button>
      </div>
    </div>
  );
}

function AddQuestionBtn(props) {
  return (
    <div className="button-section my-5" style={{ textAlign: "center" }}>
      <button
        className="button add btn btn-primary"
        type="button"
        onClick={() => props.addQuestion()}
      >
        Add new question
      </button>
    </div>
  );
}

const AdminAddUnit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [video, setVideo] = useState({ title: "", desc: "", vdoSrc: "" });
  const [disableAddUnitBtn, setDisableAddUnitBtn] = useState(false);
  //   const [courseInfo, setCourseInfo] = useState({ name: "", desc: "" });

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
    setDisableAddUnitBtn(true);
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

      navigate(`/admin/verticals/${verticalId}/courses/${courseId}/units/all`);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="a-add-unit-page-outer-div">
      <div>
        <h1>Adding a new unit for course</h1>
      </div>
      <hr className="my-5" />
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
      <hr className="my-5" />
      <div>
        <h3>Add text to read:</h3>
        <p style={{ fontSize: "140%" }}>
          Please write the reading content for this unit below.
        </p>
      </div>

      <TextInput
        name="text"
        id="text"
        label="Text"
        placeholder="..."
        value={text}
        onChange={onTextChange}
      />

      <hr className="my-5" />
      <div>
        <h3>Add Activities for this unit:</h3>
        <p style={{ fontSize: "140%" }}>
          Please enter the activity fields for users.
        </p>
      </div>

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
      <hr className="my-5" />
      <div>
        <h3>Add Quiz questions for this unit:</h3>
        <p style={{ fontSize: "140%" }}>
          Please enter the questions with its options and correct answers below.
        </p>
      </div>

      <>
        <AddQuestionBtn addQuestion={addQuestion} />

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

      <hr className="my-5" />

      <div className="my-5" style={{ textAlign: "center" }}>
        <button
          disabled={disableAddUnitBtn}
          className="btn btn-success btn-lg"
          onClick={handleAddUnit}
        >
          Add Unit
        </button>
      </div>
    </div>
  );
};

export default AdminAddUnit;
