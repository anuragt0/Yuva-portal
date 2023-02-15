import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// My components
import Card from "../../components/admin/Card";
import { CardGrid } from "../../components/common/CardGrid";
import Loader from "../../components/common/Loader";

// My css
import "../../css/admin/a-units-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { getVideoThumbnail } from "../../utilities/helper_functions";

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const UnitsPage = () => {
  const [allUnits, setAllUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAllUnits() {
      setIsLoading(true);
      const { verticalId, courseId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/courses/${courseId}/units/all`,
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
          setAllUnits(result.allUnits);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
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

  const loader = <Loader />;

  const element = (
    <section id="units">
      {allUnits.length > 0 ? (
        <CardGrid>
          {allUnits.map((unit) => {
            const vdoThumbnail = getVideoThumbnail(unit.video.vdoSrc);
            unit.vdoThumbnail = vdoThumbnail;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ padding: "10px" }}
                key={unit._id}
              >
                <Card data={unit} type="unit" onDeleteClick={openDeleteModal} />
              </div>
            );
          })}
        </CardGrid>
      ) : (
        <h1>EMPTY</h1>
      )}
    </section>
  );

  return (
    <div className="a-units-page-outer-div">
      <div style={{ textAlign: "center" }}>
        <button
          className="a-units-page-add-u-btn"
          onClick={redirectToAddUnitPage}
        >
          Add a new Unit
        </button>
      </div>

      {isLoading ? loader : element}

      {deleteModal}
    </div>
  );
};

export default UnitsPage;
