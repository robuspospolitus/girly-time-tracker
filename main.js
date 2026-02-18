// main.js
const { app, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let tray = null;
let win = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if ( win && !win.isDestroyed() ) {
            if (win.isMinimized()) win.restore();
            win.show();
            win.focus();
            return;
        }
    });
    app.once("ready", () => {
        if (process.platform === 'win32') app.setAppUserModelId("Girly Time Tracker");
        createWindow();
        setupIPC();
        app.on('activate', () => {
            const { BrowserWindow } = require('electron');
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });
}

function createTray() {
    const { nativeImage, Tray, Menu } = require('electron');
    const icon = path.join(__dirname, 'build', 'favicon.ico')
    const trayicon = nativeImage.createFromPath(icon)
    tray = new Tray(trayicon)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => { 
                createWindow();
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => { 
                if (win) win.removeAllListeners('close');
                app.quit(); 
            }
        }
    ])
    tray.setToolTip('Girly Time Tracker')
    tray.setContextMenu(contextMenu)
}

function createWindow() {
    if ( win && !win.isDestroyed() ) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
      return;
    }
    const { BrowserWindow } = require('electron');
    if(!tray) createTray()
    win = new BrowserWindow({
        width: 600,
        height: 700,
        minWidth: 470,
        minHeight: 400,
        icon: path.join(__dirname, 'build', 'favicon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    win.loadFile(path.join(__dirname, 'build', 'index.html'));
    win.setMenu(null);
    win.on('close', (e) => {e.preventDefault();win.hide();});
}

function setupIPC() {
    const userDataPath = app.getPath('userData');
    const dataPath = path.join(userDataPath, 'data.json');

    if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([{}], null, 2));
    const readData = () => { return JSON.parse(fs.readFileSync(dataPath, 'utf-8')); };
    const writeData = (data) => { fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)); };

    ipcMain.handle('get-data', () => { return readData()[0]; });

    ipcMain.handle('post-category', (_, { category, payload }) => {
        const data = readData();
        if (payload) {
            if (!data[0][category]) data[0][category] = [];
            data[0][category].unshift(payload);
            writeData(data);
        }
        return data[0][category];
    });

    ipcMain.handle('delete-item', (_, { category, id }) => {
        const data = readData();
        data[0][category] = data[0][category].filter(item => item.id !== id);
        writeData(data);
        return data[0][category];
    });

    ipcMain.handle('delete-category', (_, category) => {
        const data = readData();
        delete data[0][category];
        writeData(data);
        return data[0];
    });
}