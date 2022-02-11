const { dialog } = require("electron");

function showOpenFileDialog() {
  return new Promise(async (resolve, reject) => {
    try {
      const files = await dialog.showOpenDialog({
        title: "open",
        properties: ["openfile"],
        filters: [{ name: "markdown file", extensions: ["md"] }],
      });
      if (files && files.canceled === false) {
        resolve(files);
      } else {
        reject();
      }
    } catch (err) {
      console.error(err);
    }
  });
}

export default showOpenFileDialog;
