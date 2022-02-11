const { app, Menu } = require("electron");

const setAppMenu = (options) => {
  const isMac = process.platform === "darwin";

  // Template
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open",
          accelerator: "CmdOrCtrl+O",
          click: () => options.openFile(),
        },
        {
          label: "Save",
          accelerator: "CmdOrCtrl+S",
          click: () => options.saveFile(),
        },
        {
          label: "Save As ...",
          click: () => options.saveAsNewFile(),
        },
        { label: "Export PDF", click: () => options.exportPDF() },
      ],
    },
    {
      label: "Edit",
      submenu: [
        {
          lable: "Copy",
          accelerator: "CmdOrCtrl+C",
          role: "copy",
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          role: "paste",
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          role: "cut",
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          role: "selectAll",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: (item, focusedWindow) =>
            focusedWindow && focusedWindow.reload(),
        },
        {
          label: "Toggle DevTools",
          accelerator: isMac ? "Alt+Command+I" : "Ctrl+Shift+I",
          click: (item, focusedWindow) =>
            focusedWindow && focusedWindow.toggleDevTools(),
        },
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
  ];

  // //   MacOs
  if (isMac) {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separater" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });

    template.push({
      role: "window",
      submenu: [{ role: "minimize" }, { role: "zoom" }],
    });
  }

  const appMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(appMenu);
};

module.exports = setAppMenu;
