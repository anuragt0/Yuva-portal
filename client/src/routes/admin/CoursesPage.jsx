import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// My components
import Card from "../../components/admin/Card";
import { CardGrid } from "../../components/common/CardGrid";
import Loader from "../../components/common/Loader";

// My css
import "../../css/admin/a-courses-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { refreshScreen } from "../../utilities/helper_functions";

const CoursesPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", desc: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllCourses() {
      setIsLoading(true);
      const { verticalId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/courses/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const result = await response.json();
        // console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            if ("isLoggedIn" in result && !result.isLoggedIn) {
              navigate("/admin/login");
            } else if ("isAdmin" in result && !result.isAdmin) {
              navigate("/admin/login");
            }
          } else if (response.status === 500) {
            toast.error(result.statusText);
          }
        } else if (response.ok && response.status === 200) {
          setAllCourses(result.allCourses);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
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
    console.log(e.target);
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
                className="btn btn-danger"
                disabled={confirmText === "Confirm" ? false : true}
              >
                Delete course
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

  const loader = <Loader />;

  const element = (
    <section id="courses">
      {allCourses.length > 0 ? (
        <CardGrid>
          {allCourses.map((course) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              style={{ padding: "10px" }}
              key={course._id}
            >
              <Card
                data={course}
                type="course"
                onAddViewClick={handleAddOrViewUnits}
                onDeleteClick={openDeleteModal}
              />
            </div>
          ))}
        </CardGrid>
      ) : (
        <h1>EMPTY</h1>
      )}
    </section>
  );

  return (
    <div className="a-courses-page-outer-div">
      <div style={{ textAlign: "center" }}>
        <button className="a-courses-page-add-c-btn" onClick={openModal}>
          Add a new Course
        </button>
      </div>

      {isLoading ? loader : element}

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
    </div>
  );
};

export default CoursesPage;
