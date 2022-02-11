import { app, ipcMain } from "electron";
import createMainWindow from "./createMainWindow";
import createFileManager from "./createFileManager";
import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog";
import showOpenFileDialog from "./showOpenFileDialog";
import createPDFWindow from "./createPDFWindow";
import setAppMenu from "./setAppMenu";
import showExportPDFDialog from "./showExportPDFDialog";

let mainWindow = null;
let fileManager = null;

const openFile = async () => {
  try {
    const { filePaths } = await showOpenFileDialog();
    const text = await fileManager.readFile(filePaths[0]);
    mainWindow.sendText(text);
  } catch (err) {
    console.error(err);
  }
};

const saveFile = async () => {
  if (!fileManager.filePath) {
    saveAsNewFile();
    return;
  }

  try {
    const text = await mainWindow.requestText();
    fileManager.overwriteFile(text);
  } catch (err) {
    console.error(error);
  }
};

const saveAsNewFile = async () => {
  try {
    const [{ filePath }, text] = await Promise.all([
      showSaveAsNewFileDialog(),
      mainWindow.requestText(),
    ]);
    await fileManager.saveFile(filePath, text);
  } catch (err) {
    console.error(err);
  }
};

const exportPDF = async () => {
  try {
    const [{ filePath }, text] = await Promise.all([
      showExportPDFDialog(),
      mainWindow.requestText(),
    ]);
    const pdfWindow = createPDFWindow(text);
    pdfWindow.on("RENDERED_CONTENTS", async () => {
      try {
        const pdf = await pdfWindow.generatePDF();
        await fileManager.writePdf(filePath, pdf);
        pdfWindow.close();
      } catch (error) {
        console.error(error);
      }
      mainWindow.window.webContents.send("PRINTED_PDF", filePath);
    });
  } catch (error) {
    console.error(error);
  }
};

app.whenReady().then(() => {
  mainWindow = createMainWindow();
  fileManager = createFileManager();
  setAppMenu({ openFile, saveFile, saveAsNewFile, exportPDF });

  // mainWindow.webContents.openDevTools();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) mainWindow = createMainWindow();
});
