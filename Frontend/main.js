const { app, BrowserWindow, ipcMain, shell } = require('electron/main');
const path = require('node:path');

let store; // <-- pas later instantiëren

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
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
        rotation_marker_posX: 0.52,
		    rotation_marker_posY: 0.54
      }
    },

    clearInvalidConfig: true // reset naar defaults i.p.v. crashen bij corrupte JSON
  });

  // IPC handlers pas registreren als store bestaat
  ipcMain.handle('store-get', (event, key) => {
    return store.get(key);
  });

  ipcMain.handle('store-set', (event, key, val) => {
    store.set(key, val);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});