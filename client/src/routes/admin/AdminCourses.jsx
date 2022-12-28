import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { refreshScreen } from "../../utilities/helper_functions";

const AdminCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", desc: "" });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllCourses() {
      const { verticalId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/public/verticals/${verticalId}/courses/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const { statusText, allCourses } = await response.json();

        console.log(statusText);
        console.log(allCourses);

        setAllCourses(allCourses);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllCourses();
  }, []);

  ////////////////////////////////////////////// Add Course Modal ///////////////////////////////////////////////////

  const ref = useRef(null);
  const refClose = useRef(null);

  async function openModal() {
    ref.current.click();
  }

  function onChange(e) {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    // console.log(newCourse);
  }

  async function handleAddCourse(e) {
    e.preventDefault();

    const { verticalId } = params;

    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/courses/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(newCourse),
        }
      );

      const data = await response.json();
      console.log(data);

      refClose.current.click();
    } catch (error) {
      console.log(error.message);
    }
  }

  /////////////////////////////////////// Delete Course Modal //////////////////////////////////////////////////

  const ref2 = useRef(null);
  const refClose2 = useRef(null);
  const [toDeleteCourseId, setToDeleteCourseId] = useState("");
  const [confirmText, setConfirmText] = useState("");

  function onConfirmTextChange(e) {
    setConfirmText(e.target.value);
  }

  function openDeleteModal(e) {
    ref2.current.click();
    setToDeleteCourseId(e.target.id);
  }

  async function handleDeleteCourse() {
    const { verticalId } = params;
    const courseId = toDeleteCourseId;
    console.log(courseId);

    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/courses/${courseId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const { statusText } = await response.json();
      console.log(statusText);

      refClose2.current.click();
      // refreshScreen();
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteModal = (
    <>
      <button
        ref={ref2}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal3"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {/* <i className="fa-solid fa-xmark"></i> */}
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Confirmation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="confirm"
                    name="confirm"
                    minLength={3}
                    required
                    placeholder="Type 'Confirm' to delete"
                    value={confirmText}
                    onChange={onConfirmTextChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose2}
              >
                Close
              </button>
              <button
                onClick={handleDeleteCourse}
                type="button"
                className="btn btn-primary"
                disabled={confirmText === "Confirm" ? false : true}
              >
                - Delete course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function handleAddOrViewUnits(e) {
    const { verticalId } = params;
    const courseId = e.target.id;

    navigate(`/admin/verticals/${verticalId}/courses/${courseId}/units/all`);
  }

  return (
    <>
      <div style={{ textAlign: "center", margin: "2%" }}>
        <button onClick={openModal} className="btn btn-primary btn-lg">
          + Courses
        </button>
      </div>
      <section className="online">
        <div className="container">
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <div className="content grid2">
            {allCourses.map((course) => (
              <div className="box" key={course._id}>
                <h2>{course.name}</h2>
                <h5>{course.desc}</h5>
                <span>{course.unitArr.length} Units </span>
                <br />
                <button
                  className="btn btn-primary"
                  style={{ margin: "10px" }}
                  id={course._id}
                  onClick={handleAddOrViewUnits}
                >
                  + Add / View units
                </button>
                <button
                  className="btn btn-primary"
                  id={course._id}
                  onClick={openDeleteModal}
                >
                  - Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a new course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    minLength={3}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    name="desc"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleAddCourse}
                type="button"
                className="btn btn-primary"
              >
                Add course
              </button>
            </div>
          </div>
        </div>
      </div>

      {deleteModal}
    </>
  );
};

export default AdminCourses;
