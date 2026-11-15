import { Component } from "@angular/core";
import { WindowControlsComponent } from "./components/window-controls.component";

@Component({
  selector: "app-settings-screen",
  imports: [WindowControlsComponent],
  templateUrl: "./window.settingsscreen.html",
  styleUrls: ["./window.characterscreen.css" , "./window.settingsscreen.css"],
})
export class SettingsScreenComponent {}
