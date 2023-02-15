import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// My components
import Card from "../../components/admin/Card";
import HeaderCard from "../../components/common/HeaderCard";
import { CardGrid } from "../../components/common/CardGrid";
import Loader from "../../components/common/Loader";

// My css
import "../../css/admin/a-verticals-page.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import { refreshScreen } from "../../utilities/helper_functions";

//////////////////////////////////////////////////////////////////////////////////////////////

const VerticalsPage = () => {
  const [allVerticals, setAllVerticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newVertical, setNewVertical] = useState({ name: "", desc: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function getAllVerticals() {
      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/admin/auth/verticals/all`,
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
          setAllVerticals(result.allVerticals);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getAllVerticals();
  }, []);

  //////////////////////////////// Add Vertical Modal ////////////////////////////////////////

  const ref = useRef(null);
  const refClose = useRef(null);

  async function openAddModal() {
    ref.current.click();
  }

  function onAddChange(e) {
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
      // console.log(data);

      refClose.current.click();
      // refreshScreen();
    } catch (error) {
      console.log(error.message);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async function handleAddOrViewCourses(e) {
    const verticalId = e.target.id;
    // console.log(verticalId);
    navigate(`/admin/verticals/${verticalId}/courses/all`);
  }

  ////////////////////////////////////// Delete Vertical Modal ///////////////////////////////////////////////////
  const ref2 = useRef(null);
  const refClose2 = useRef(null);
  const [toDeleteVerticalId, setToDeleteVerticalId] = useState("");
  const [confirmText, setConfirmText] = useState("");

  function openDeleteModal(e) {
    ref2.current.click();
    setToDeleteVerticalId(e.target.id);
  }

  function onConfirmTextChange(e) {
    setConfirmText(e.target.value);
  }

  async function handleDeleteVertical() {
    const verticalId = toDeleteVerticalId;
    // todo: validate input
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/verticals/${verticalId}/delete`,
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
                Delete vertical
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
                onClick={handleDeleteVertical}
                type="button"
                className="btn btn-danger"
                disabled={confirmText === "Confirm" ? false : true}
              >
                Delete Vertical
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const loader = <Loader />;

  const element = (
    <section id="verticals">
      {allVerticals.length > 0 ? (
        <CardGrid>
          {allVerticals.map((vertical) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              style={{ padding: "10px" }}
              key={vertical._id}
            >
              <Card
                data={vertical}
                type="vertical"
                onAddViewClick={handleAddOrViewCourses}
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
    <div className="a-verticals-page-outer-div">
      <HeaderCard>
        <h1>Verticals</h1>

        <div style={{ textAlign: "left", fontFamily: "var(--font-family-2)" }}>
          <h4>
            <i className="fa-solid fa-arrow-right"></i> Every verticals related
            information is available on this page.
          </h4>
          <h4>
            <i className="fa-solid fa-arrow-right"></i> You can View/Add/Delete
            any vertical.
          </h4>
          <h5>
            Note: Deleting a vertical is irreversible. Do it at your own risk.
          </h5>
        </div>
        <button
          onClick={openAddModal}
          className="text-ff2 a-verticals-page-add-v-btn btn bt btn"
        >
          Add a new vertical
        </button>
      </HeaderCard>

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
                Add a new vertical
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
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    minLength={3}
                    onChange={onAddChange}
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
                    onChange={onAddChange}
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
                    onChange={onAddChange}
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
                Add Vertical
              </button>
            </div>
          </div>
        </div>
      </div>

      {deleteModal}
    </div>
  );
};

export default VerticalsPage;
