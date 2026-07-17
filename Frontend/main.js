const { app, BrowserWindow, ipcMain, shell } = require('electron/main')

const Store = require('electron-store');
const store = new Store({
  cwd: __dirname,
  name: "character_settings"
});

const path = require('node:path');
const { cwd } = require('node:process');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

ipcMain.handle('store-get', (event, key) => {
  return store.get(key);  // <--- kleine letter s!
});

ipcMain.handle('store-set', (event, key, val) => {
    store.set(key, val);  // <--- kleine letter s!
});

app.whenReady().then(() => {
  createWindow();

  // Deze regel opent automatisch de map waar config.json in staat!
  // shell.showItemInFolder(store.path);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})