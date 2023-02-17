import React from "react";

import "../../css/admin/a-add-unit-page.css";

const TextInput = (props) => {
  return (
    <textarea
    className="a-add-unit-page-text-textarea"
      name="text"
      id="text"
      label="Text"
      placeholder="Text"
      rows={10}
      // cols={100}
      width={100}
      value={props.value}
      onChange={(e) => {
        props.onChange(e);
      }}
    />
  );
};

export default TextInput;
