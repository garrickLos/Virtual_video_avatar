const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

contextBridge.exposeInMainWorld('storeAPI', {
    get: async (key) => {
        try {
            return await ipcRenderer.invoke('store-get', key);
        } catch (err) {
            console.error('storeAPI.get failed:', err);
            return undefined;
        }
    },
    set: async (key, val) => {
        try {
            return await ipcRenderer.invoke('store-set', key, val);
        } catch (err) {
            console.error('storeAPI.set failed:', err);
        }
    }
});