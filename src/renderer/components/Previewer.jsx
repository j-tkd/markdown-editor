import React from "react";
import { marked } from "marked";
import style from "./Previewer.css";

export const Previewer = ({ value, className }) => {
  // console.log(JSON.stringify(value));
  return (
    <div id="previewer" className={`${className} ${style.previewer}`}>
      <h2>Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: marked(value) }} />
    </div>
  );
};

export default Previewer;
