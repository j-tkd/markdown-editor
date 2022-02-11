import React from "react";
import style from "./Editor.css";

export const Editor = ({ value, onChange, className }) => {
  return (
    <div className={style.editor}>
      <h2>Editor</h2>
      <textarea
        id="editor"
        className={`${style.editor} ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
