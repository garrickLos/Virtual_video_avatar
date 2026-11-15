import { Component, signal } from "@angular/core";
import { ButtonComponent } from "./components/button.component";
import { WindowControlsComponent } from "./components/window-controls.component";
import { talkingButtonComponent } from "./components/talking-button/talking-button.component";
import { openSpecificWindow } from "./window.characterScreen.components";

@Component({
  selector: "app-character-screen",
  imports: [ButtonComponent, WindowControlsComponent, talkingButtonComponent],
  templateUrl: "./window.characterscreen.html",
  styleUrl: "./window.characterscreen.css",
})
export class CharacterScreenComponent {

  greetingMessage = signal("");
  settingsHidden = false;

  toggleSettingsVisibility(event: Event): void {
    this.settingsHidden = (event.target as HTMLInputElement).checked;
  }

  openSettingsWindow(event: Event): void {
    event.preventDefault();

    openSpecificWindow('settings-window', '/#/settings');
  }
}
