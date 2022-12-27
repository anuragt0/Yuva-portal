import React from "react";
import "../App.css";

const UserProfile = () => {
  return (
    <div className="outerbox">
      <h2>User Information-</h2>

      <form>
        <div class="form-group row profile">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value="email@example.com"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="staticUserId" class="col-sm-2 col-form-label">
            UserID
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticUserId"
              value="UserID"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="firstName" class="col-sm-2 col-form-label">
            First Name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="lastName" class="col-sm-2 col-form-label">
            Last Name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="address1" class="col-sm-2 col-form-label">
            Address line 1
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="address1"
              placeholder="Address line 1"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="address2" class="col-sm-2 col-form-label">
            Address line 2
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="address2"
              placeholder="Address line 2"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="city" class="col-sm-2 col-form-label">
            City
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="city"
              placeholder="City"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="pincode" class="col-sm-2 col-form-label">
            Pincode
          </label>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control"
              id="pincode"
              placeholder="Pincode"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="country" class="col-sm-2 col-form-label">
            Country
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="country"
              placeholder="Country"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="currentPass" class="col-sm-2 col-form-label">
            Current Password
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="currentPass"
              placeholder="Current Password"
            />
          </div>
        </div>
        <div class="form-group row profile">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            New Password
          </label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="New Password"
            />
          </div>
        </div>
        <div style={{ margin: "50px 0 0 44%" }}>
          <button className="btn btn-success update" style={{}}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
