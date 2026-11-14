import { Component, signal } from "@angular/core";
import { ButtonComponent } from "./components/button.component";
import { WindowControlsComponent } from "./components/window-controls.component";
import { talkingButtonComponent } from "./components/talking-button/talking-button.component";

@Component({
  selector: "app-root",
  imports: [ButtonComponent, WindowControlsComponent, talkingButtonComponent],
  templateUrl: "./window.characterScreen.html",
  styleUrl: "./window.character-screen.css",
})
export class AppComponent {

  greetingMessage = signal("");
  settingsHidden = false;

  toggleSettingsVisibility(event: Event): void {
    this.settingsHidden = (event.target as HTMLInputElement).checked;
  }
}
