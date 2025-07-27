// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { fork } = require('child_process'); 

let serverProcess;

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        icon: path.join(__dirname, 'icon.ico'),
        
    });
    const userDataPath = app.getPath('userData');

    serverProcess = fork(path.join(__dirname, 'server', 'server.js'), [userDataPath]);

    // win.loadFile(path.join(__dirname, 'build', 'index.html'));
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools();
    win.setMenu(null);
    
}
    app.whenReady().then(() => {
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

    app.on('window-all-closed', () => {
        if (serverProcess) serverProcess.kill();
        if(process.platform !== 'darwin') app.quit();
    })