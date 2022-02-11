import React, { useEffect, useState } from "react";
import Previewer from "./Previewer";

export const PDFUI = () => {
  const [text, setText] = useState("");

  useEffect(async () => {
    // Mainにテキストを要求するAPI
    try {
      const text = await window.myAPI.requestMain();
      setText(text);
      await syncImageRendered();
      console.log("終了");
      window.myAPI.rendered();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const syncImageRendered = () => {
    console.log("謎関数");
    const images = Array.prototype.slice.call(document.querySelectorAll("img"));
    const loadingImages = images.filter((image) => !image.complete);
    if (loadingImages.length === 0) {
      return Promise.resolve();
    }
    return Promise.all(
      loadingImages.map(
        (image) => new Promise((resolve) => (image.onload = () => resolve()))
      )
    );
  };

  return (
    <div>
      <h1>PDFプレビュー</h1>
      <Previewer value={text} />
    </div>
  );
};

export default PDFUI;
