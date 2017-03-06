const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut
} = require('electron');
const path = require('path');
const url = require('url');
let win
  // Menu.setApplicationMenu(null)
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('closed', function() {
    win = null;
  })
}

app.on('ready', function() {
  createWindow();

  /** register global shortcut **/
  // global shortcut for creating a file
  globalShortcut.register('CommandOrControl+N', () => {
    console.log('sending newFile command to window!');
    win.webContents.send('newFile')
  });

  // global shortcut for opening a file
  globalShortcut.register('CommandOrControl+O', ()=>{
    console.log('sending openFile command to window!');
    win.webContents.send('openFile')
  });

  // global shortcut for saving a file
  globalShortcut.register('CommandOrControl+S', ()=>{
    console.log('sending saveFile command to window!');
    win.webContents.send('saveFile')
  });

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (win == null) {
    createWindow();
  }
})
