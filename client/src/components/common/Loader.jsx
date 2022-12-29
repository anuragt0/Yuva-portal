import React from "react";
import DotLoader from "react-spinners/DotLoader";

const override = {
  margin: "auto",
  width: "fit-content",
  marginTop: "120px",
  textAlign: "center",
};

const Loader = () => {
  return (
    <div style={override}>
      <DotLoader
        color="red"
        loading={true}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
