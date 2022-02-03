import { BrowserWindow } from "electron";
import path from "path";
// import isDev from "electron-is-dev";

const createMainWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    // },
  });

  // and load the index.html of the app.
  //   mainWindow.loadURL(
  //     isDev
  //       ? "http://localhost:3000"
  //       : `file://${path.join(__dirname, "../../build/index.html")}`
  //   );
  mainWindow.loadURL(path.join(__dirname, "/../renderer/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

export default createMainWindow;
