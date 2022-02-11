const { contextBridge, ipcRenderer } = require("electron");

const WINDOW_API = {
  requestRenderer: (callback) => {
    ipcRenderer.on("REQUEST_TEXT", (event, args) => {
      callback();
    });
  },

  replyText: (text) => ipcRenderer.send("REPLY_TEXT", text),

  recieveText: (callback) => {
    ipcRenderer.on("SEND_TEXT", (event, args) => {
      callback(args);
    });
  },

  requestMain: () => ipcRenderer.invoke("REQUEST_MAIN"),

  rendered: () => {
    ipcRenderer.send("RENDERED_CONTENTS");
  },

  printedPDF: (callback) => {
    ipcRenderer.on("PRINTED_PDF", (event, args) => {
      callback(args);
    });
  },

  removeListener: () => ipcRenderer.removeAllListeners(),
};

contextBridge.exposeInMainWorld("myAPI", WINDOW_API);
