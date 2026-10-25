# Tauri + Angular

This template should help get you started developing with Tauri and Angular.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) + [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

## Run the desktop app from VS Code

Open the repository root in VS Code and run **Terminal: Run Build Task** (or press
**Ctrl+Shift+B**). Select **Tauri: Starten** if prompted. This starts `tauri dev`
from the `vva-app` directory; Tauri starts the Angular dev server and opens the
desktop window.

You can also start it in the integrated terminal:

```powershell
cd vva-app
npm.cmd run tauri -- dev
```

Install the Tauri prerequisites for Windows (Rust and the Microsoft C++ Build
Tools) before the first run. The Tauri VS Code extension and `rust-analyzer`
provide editor integration, but the VS Code task is what launches the app.
