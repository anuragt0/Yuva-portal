import React, { useEffect, useContext } from "react";
import { useState } from "react";
import CourseStructure from "./CourseStructure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import courseContext from "../context/CourseContext";
import { SERVER_ORIGIN } from "../utilities/constants";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/public/courses/all`,
        config
      );

      const { statusText, allCourses } = await response.json();
      console.log(statusText);
      console.log(allCourses);

      setCourses(allCourses);
    }

    fetchCourses();
  }, []);

  return (
    <>
      <h1 style={{ padding: "30px", fontFamily: "Montserrat" }}>
        Available courses-
      </h1>

      <div className="row">
        {courses.map((course) => {
          return <CourseStructure key={course._id} course={course} />;
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default Courses;
