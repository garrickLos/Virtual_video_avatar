import { Component, signal } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { ButtonComponent } from "./components/button.component";
import { WindowControlsComponent } from "./components/window-controls.component";

@Component({
  selector: "app-root",
  imports: [ButtonComponent, WindowControlsComponent],
  templateUrl: "./window.characterScreen.component.html",
  styleUrl: "./window.character-screen.component.css",
})
export class AppComponent {
  greetingMessage = signal("");

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage.set(text);
    });
  }
}
