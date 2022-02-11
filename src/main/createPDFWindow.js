import { BrowserWindow } from "electron";
import { ipcMain } from "electron";
import EventEmitter from "events";
import path from "path";

class PDFWindow extends EventEmitter {
  constructor(text) {
    super(text);
    this.window = new BrowserWindow({
      show: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    this.window.loadURL(path.join(__dirname, "/../renderer/pdf.html"));

    // this.window.webContents.openDevTools();

    ipcMain.handleOnce("REQUEST_MAIN", async (event, args) => {
      return text;
    });

    ipcMain.once("RENDERED_CONTENTS", () => {
      this.emit("RENDERED_CONTENTS");
    });
  }

  generatePDF() {
    return this.window.webContents.printToPDF({}, (error, data) => {
      if (error) {
        console.log("error:", error);
        reject(error);
      } else {
        console.log("data:", data);
        resolve(data);
      }
    });
  }

  close() {
    this.window.close();
    this.window.on("closed", () => {
      this.window = null;
    });
  }
}

function createPDFWindow(contents) {
  return new PDFWindow(contents);
}

export default createPDFWindow;
