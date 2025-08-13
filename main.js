// main.js
const { app } = require('electron');
const path = require('path');

let serverProcess, win;
let tray = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    if(serverProcess) serverProcess.kill();
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
        createWindow();
        if(!serverProcess) createServer();
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
    tray = new Tray(trayicon.resize({ width: 16 }))
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
                if (serverProcess) serverProcess.kill(); 
                if (win) win.removeAllListeners('close');
                app.quit(); 
            }
        }
    ])
    tray.setToolTip('Girly Time Tracker')
    tray.setContextMenu(contextMenu)
}

const createServer = () => {
    if (serverProcess && !serverProcess.killed) return;
    const { fork } = require('child_process'); 
    const userDataPath = app.getPath('userData');
    serverProcess = fork(path.join(__dirname, 'server', 'server.js'), [userDataPath]);
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
        }
    });
    
    win.loadFile(path.join(__dirname, 'build', 'index.html'));
    win.setMenu(null);
    win.on('close', (e) => {e.preventDefault();win.hide();});
}