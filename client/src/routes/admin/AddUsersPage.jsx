import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { SERVER_ORIGIN } from "../../utilities/constants";

const AddUsersPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please choose a csv file");
      return;
    }

    console.log(file);

    setFile(file);
  };

  const handleFileSubmit = async (e) => {
    if (!file) {
      toast.error("Please choose a csv file");
      return;
    }

    const form = new FormData();
    form.append("userCreds", file);
    // console.log(form);

    // try {
    //   const response = await axios.post(
    //     `${SERVER_ORIGIN}/api/admin/auth/add-users`,
    //     form
    //   );
    //   console.log(response);
    //   // setData(response.data);
    // } catch (error) {
    //   console.error(error);
    // }

    // ! donot set content-type while using fetch to upload properly
    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/api/admin/auth/add-users`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("token"),
          },
          body: form,
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "5rem" }}>
        <input type="file" name="file" onChange={handleFileChange} />
      </div>

      <button onClick={handleFileSubmit}>Submit</button>
    </>
  );
};

export default AddUsersPage;
