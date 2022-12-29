import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

// TODO

import { SERVER_ORIGIN } from "../../utilities/constants";
import {
  youtubeParser,
  getVideoThumbnail,
} from "../../utilities/helper_functions";

const AdminUnits = () => {
  const [allUnits, setAllUnits] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllUnits() {
      const { verticalId, courseId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/public/verticals/${verticalId}/courses/${courseId}/units/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const { statusText, allUnits } = await response.json();

        console.log(statusText);
        console.log(allUnits);

        setAllUnits(allUnits);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllUnits();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function redirectToAddUnitPage(e) {
    const { verticalId, courseId } = params;
    // console.log(params);

    navigate(`/admin/verticals/${verticalId}/courses/${courseId}/units/add`);
  }

  /////////////////////////////////////// Delete Course Modal //////////////////////////////////////////////////

  const ref = useRef(null);
  const refClose = useRef(null);
  const [toDeleteUnitId, setToDeleteUnitId] = useState("");
  const [confirmText, setConfirmText] = useState("");

  function onConfirmTextChange(e) {
    setConfirmText(e.target.value);
  }

  function openDeleteModal(e) {
    ref.current.click();
    setToDeleteUnitId(e.target.id);
  }

  async function handleDeleteUnit() {
    const { verticalId, courseId } = params;
    const unitId = toDeleteUnitId;
    // console.log(courseId);

    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}/delete`,
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

      refClose.current.click();
      // refreshScreen();
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteModal = (
    <>
      <button
        ref={ref}
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
                Delete Unit
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
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleDeleteUnit}
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

  return (
    <>
      <div style={{ textAlign: "center", margin: "2%" }}>
        <button
          onClick={redirectToAddUnitPage}
          className="btn btn-primary btn-lg"
        >
          + Unit
        </button>
      </div>
      <section className="online">
        <div className="container">
          {/* <Heading subtitle="COURSES" title="Browse Our Online Courses" /> */}
          <div className="content grid2">
            {allUnits.map((unit) => {
              const vdoThumbnail = getVideoThumbnail(unit.video.vdoSrc);

              return (
                <div className="box" key={unit._id}>
                  <div className="img">
                    <img src={vdoThumbnail} alt="sjfn" />
                    {/* <img src={vertical.imgSrc} alt="" className="show" /> */}
                  </div>
                  <span>1 Video</span>
                  <span>1 Text</span>
                  <span>{unit.activities.length} Activities</span>
                  <span>{unit.quiz.length} Question</span>
                  <br />
                  <button
                    className="btn btn-primary"
                    id={unit._id}
                    onClick={openDeleteModal}
                  >
                    - Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {deleteModal}
    </>
  );
};

export default AdminUnits;
