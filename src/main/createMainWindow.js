import { BrowserWindow, ipcMain, shell } from "electron";
import path from "path";

class MainWindow {
  // Create the browser window.
  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    this.window.loadURL(path.join(__dirname, "/../renderer/index.html"));
    this.window.on("closed", () => {
      this.window = null;
    });

    this.window.webContents.on("will-navigate", (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    });

    // this.window.webContents.openDevTools();
  }

  // Main → Renderer → Mainのテキスト受取
  requestText() {
    return new Promise((resolve, reject) => {
      this.window.webContents.send("REQUEST_TEXT", "request!!");
      ipcMain.once("REPLY_TEXT", (event, args) => resolve(args));
    });
  }

  // Main → Rendererのテキスト送信
  sendText(text) {
    this.window.webContents.send("SEND_TEXT", text);
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;
