import { NgTemplateOutlet } from "@angular/common";
import { Component, signal } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { ButtonComponent } from "./components/button.component";

@Component({
  selector: "app-root",
  imports: [NgTemplateOutlet, ButtonComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
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
