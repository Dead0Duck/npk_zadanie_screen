import { app, screen, BrowserWindow, Display, ipcMain, dialog, nativeTheme } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const IS_DEV = process.env.NODE_ENV === "development"

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let mainWindow: BrowserWindow | null
let showWindow: BrowserWindow | null

function createWindow() {
  nativeTheme.themeSource = "dark"

  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    title: "NPK Показ задания",
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  mainWindow.on("close", () => showWindow?.close())
  mainWindow.removeMenu();
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // mainWindow.loadFile('dist/index.html')
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  if (IS_DEV)
    mainWindow.webContents.openDevTools()

  const displays = screen.getAllDisplays();
  const externalDisplay: Display | null = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  }) || null;
  if (!externalDisplay) {
    mainWindow.close();
    dialog.showErrorBox("Ошибка", "Не найден второй монитор")
    return false;
  }
  const { x, y } = externalDisplay.bounds
  const { width, height } = externalDisplay.workAreaSize

  showWindow = new BrowserWindow({
    x: x,
    y: y,
    height: height,
    width: width,
    skipTaskbar: true,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: false,
    focusable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    }
  })

  // Не знаю почему, но при инициализации он не всегда корретно выставляет размер окна
  showWindow.setBounds({
    width,
    height,
    x,
    y
  });

  if (VITE_DEV_SERVER_URL) {
    showWindow.loadURL(path.join(VITE_DEV_SERVER_URL, 'show.html'))
  } else {
    // mainWindow.loadFile('dist/show.html')
    showWindow.loadFile(path.join(RENDERER_DIST, 'show.html'))
  }
  if (IS_DEV)
    showWindow.webContents.openDevTools();
  else
    showWindow.setIgnoreMouseEvents(true);

  ipcMain.removeAllListeners("zadUpd")
  ipcMain.removeAllListeners("zadHide")

  ipcMain.on('zadUpd', (_event, site, text) => {
    showWindow?.webContents.send('zadUpd', site, text);
  });

  ipcMain.on('zadHide', (_event) => {
    showWindow?.webContents.send('zadHide');
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    mainWindow = null
    showWindow = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
