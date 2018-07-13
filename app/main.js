import { app, BrowserWindow } from 'electron';

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    // { show: false } is used to avoid displaying a black box when transitioning to maximized window size.
    mainWindow = new BrowserWindow({ show: false });
    mainWindow.maximize();
    mainWindow.loadURL('http://localhost:3030/', {userAgent: 'Electron'});


    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
