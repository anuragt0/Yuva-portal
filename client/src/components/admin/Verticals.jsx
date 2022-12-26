import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/verticals.css";

// My components
// import Modal from "../../components/admin/Modal";

import { SERVER_ORIGIN } from "../../utilities/constants";

const Verticals = () => {
  const url =
    "https://images.unsplash.com/photo-1671989088481-e1e045dbdd20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  const [allVerticals, setAllVerticals] = useState([]);
  const [newVertical, setNewVertical] = useState({ name: "", desc: "" });

  useEffect(() => {
    async function getAllVerticals() {
      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/public/verticals/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const { statusText, allVerticals } = await response.json();

        console.log(statusText);
        console.log(allVerticals);

        // setAllVerticals(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllVerticals();
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  async function openModal() {
    console.log("skjfnskjnfdsf");
    ref.current.click();
  }

  function onChange(e) {
    setNewVertical({ ...newVertical, [e.target.name]: e.target.value });
    console.log(newVertical);
  }

  async function handleAddVertical(e) {
    e.preventDefault();

    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(newVertical),
        }
      );

      const data = await response.json();
      console.log(data);

      refClose.current.click();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <button onClick={openModal}>+ Vertical</button>
      <section className="online">
        <div className="container">
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <div className="content grid2">
            {online.map((val) => (
              <div className="box">
                <div className="img">
                  <img src={url} alt="sjfn" />
                  <img src={val.hoverCover} alt="" className="show" />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
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
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
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
                <div className="mb-3">
                  <label htmlFor="imgSrc" className="form-label">
                    Image Source
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imgSrc"
                    name="imgSrc"
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
                onClick={handleAddVertical}
                type="button"
                className="btn btn-primary"
              >
                Add course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const online = [
  {
    cover: "./images/courses/climatechange.jpg",
    hoverCover: "./images/courses/climatechange.jpg",
    courseName: "CLIMATE CHANGE",
    course: "25 Courses",
  },
  {
    cover: "./images/courses/accessibility.jpg",
    hoverCover: "./images/courses/accessibility.jpg",
    courseName: "ACCESSIBILITY",
    course: "25 Courses",
  },
  {
    cover: "./images/courses/roadsafety.jpg",
    hoverCover: "./images/courses/roadsafety.jpg",
    courseName: "ROAD SAFETY",
    course: "10 Courses",
  },
  {
    cover: "./images/courses/ei.jpg",
    hoverCover: "./images/courses/ei.jpg",
    courseName: "ENTREPRENEURSHIP & INNOVATION",
    course: "15 Courses",
  },
  {
    cover: "./images/courses/nukkadnatak.jpg",
    hoverCover: "./images/courses/nukkadnatak.jpg",
    courseName: "MASOOM",
    course: "30 Courses",
  },
  {
    cover: "./images/courses/health.jpg",
    hoverCover: "./images/courses/health.jpg",
    courseName: "HEALTH",
    course: "60 Courses",
  },
  {
    cover: "./images/courses/learning.jpg",
    hoverCover: "./images/courses/learning.jpg",
    courseName: "LEARNING",
    course: "10 Courses",
  },
];

export default Verticals;
