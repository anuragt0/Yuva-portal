import React, { useState } from "react";

import { SERVER_ORIGIN } from "../../utilities/constants";
import axios from "axios";

const AddUsersPage = () => {
  const [file, setFile] = useState();

  async function send(event) {
    const data = new FormData();
    data.append("test", file);
    console.log(data);

    try {
      const response = await axios.post(
        `${SERVER_ORIGIN}/api/admin/auth/add-users`,
        data
      );
      console.log(response);
      // setData(response.data);
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const response = await fetch(
    //     `${SERVER_ORIGIN}/api/admin/auth/add-users`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         "auth-token": localStorage.getItem("token"),
    //       },
    //       body: data,
    //     }
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
    <>
      <div style={{ marginTop: "5rem" }}>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setFile(file);
          }}
        />
      </div>

      <button onClick={send}>Submit</button>
    </>
  );
};

export default AddUsersPage;
