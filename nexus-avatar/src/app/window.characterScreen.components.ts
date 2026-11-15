import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export function openSpecificWindow(windowUniqueId: string, htmlUrl: string) {
    // Maak een nieuw venster aan. Het eerste argument is een unieke label voor het venster.
    // The new window must also be added in default.json when adding it.
    const secondWindow = new WebviewWindow(windowUniqueId, {
      url: htmlUrl,
      width: 800,
      height: 600,
      decorations: false,
      transparent: true,
    });

    // Optional: listens to the event if the window is succesfully openend.
    secondWindow.once('tauri://created', () => {
      console.log('New window succesfully opened');
    });

    secondWindow.once('tauri://error', (e) => {
      console.error('Error opening new window:', e);
    });
}