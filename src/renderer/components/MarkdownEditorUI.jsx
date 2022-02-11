import React, { useEffect, useRef, useState } from "react";
import style from "./MarkdownEditorUI.css";
import Editor from "./Editor";
import Previewer from "./Previewer";

export const MarkdownEditorUI = () => {
  const [text, setText] = useState("");
  const textRef = useRef(null);
  textRef.current = text;

  useEffect(() => {
    window.myAPI.requestRenderer(() => {
      // console.log("text.current:", textRef.current);
      window.myAPI.replyText(textRef.current);
    });

    window.myAPI.recieveText((savedText) => {
      // console.log("savedText:", savedText);
      setText(savedText);
    });

    window.myAPI.printedPDF((args) => {
      alert(`PDF出力が完了しました。\n ファイル: ${args}`);
    });

    return () => window.myAPI.removeListener();
  }, []);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <main>
      <h1 className={style.title}>markdownEditor</h1>
      <div className={style.markdownEditor}>
        <Editor
          className={style.editorArea}
          value={text}
          onChange={onChangeText}
        />
        <Previewer className={style.previewerArea} value={text} />
      </div>
    </main>
  );
};

export default MarkdownEditorUI;
