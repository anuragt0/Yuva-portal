import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const override = {
  margin: "auto",
  width: "fit-content",
  marginTop: "25%",
  textAlign: "center",
};

const Loader = () => {
  return (
    <div style={override}>
      <SyncLoader
        // color="red"
        color="grey"
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
