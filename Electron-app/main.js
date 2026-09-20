const { app, BrowserWindow, ipcMain, shell } = require('electron/main');
const path = require('node:path');

let store; // <-- pas later instantiëren

const windows = {
  main: null,
  settings: null,
  faq: null
};

ipcMain.on("create-window", (event, page, key) => {
  createWindow(page, key);
});

function createWindow(htmlFileName, key) {

  if (windows[key] && !windows[key].isDestroyed()) {
    windows[key].focus();
    return windows[key];
  }

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "resources/logo/Virtual_Video_Avatar_logo.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile(path.join(__dirname, htmlFileName));

  windows[key] = win;

  win.on("closed", () => {
    delete windows[key];
  });

  return win;
}

app.whenReady().then(() => {
  console.log('UserData pad:', app.getPath('userData'));

  const Store = require('electron-store');
  store = new Store({
    cwd: app.isPackaged ? app.getPath('userData') : __dirname,
    name: "character_settings",
    schema: {
      character_settings: {
        type: 'object',
        properties: {
          head_picture: { type: 'string' },
          body_picture: { type: 'string' },
          background_color: { type: 'string' },
          background_color_shortcuts: { type: "array", items: { type: "object", additionalProperties: { type: "string" } } },
          character_scale_input: { type: 'number' },
          rotation_marker_active: { type: 'boolean' },
          rotation_marker_posX: { type: 'number' },
          rotation_marker_posY: { type: 'number' }
        }
      }
    },
    defaults: {
      character_settings: {
        head_picture: "./character_art/Characters/Default-head.png",
        body_picture: "./character_art/Characters/Default-body.png",
        background_color: "rgb(0, 255, 0)",
        background_color_shortcuts: [{ "color": "#00ff00", "color": "#ff0000", "color": "#0000ff" }],
        character_scale_input: 1,
        rotation_marker_active: true,
        rotation_marker_posX: 0.5,
        rotation_marker_posY: 0.54
      }
    },

    watch: true,

    clearInvalidConfig: true // reset naar defaults i.p.v. crashen bij corrupte JSON
  });

  // IPC handlers pas registreren als store bestaat
  ipcMain.handle('store-get', (event, key) => {
    return store.get(key);
  });

  ipcMain.handle('store-set', (event, key, val) => {
    store.set(key, val);
  });

  store.onDidChange('character_settings', (newSettings) => {
    for (const win of Object.values(windows)) {
      if (win && !win.isDestroyed()) {
        win.webContents.send('settings-changed', newSettings);
      }
    }
  });

  createWindow("./index.html", "main");

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow("./index.html", "main");
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});