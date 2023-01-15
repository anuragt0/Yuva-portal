import React, { useEffect, useState, useRef } from "react";
import "../../css/admin/admin-verticals.css";
import { useNavigate, useParams } from "react-router-dom";

import { SERVER_ORIGIN } from "../../utilities/constants";
import {
  youtubeParser,
  getVideoThumbnail,
} from "../../utilities/helper_functions";

import Card from "../../components/admin/Card";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    // console.log(e.target);
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
                className="btn btn-danger"
                disabled={confirmText === "Confirm" ? false : true}
              >
                Delete unit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "8rem" }}>
        <button
          onClick={redirectToAddUnitPage}
          className="btn btn-primary btn-lg"
        >
          Add a new Unit
        </button>
      </div>

      <section id="units">
        <div className="user-unit-grid-div">
          <div className="row">
            {allUnits.map((unit) => {
              const vdoThumbnail = getVideoThumbnail(unit.video.vdoSrc);
              unit.vdoThumbnail = vdoThumbnail;

              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-12"
                  style={{ padding: "10px" }}
                  key={unit._id}
                >
                  <Card
                    data={unit}
                    type="unit"
                    onDeleteClick={openDeleteModal}
                  />
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
