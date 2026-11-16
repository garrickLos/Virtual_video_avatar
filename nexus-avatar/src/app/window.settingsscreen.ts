import { Component } from "@angular/core";
import { FoldButtonComponent } from "./components/foldButton.component";

@Component({
  selector: "app-settings-screen",
  imports: [FoldButtonComponent],
  templateUrl: "./window.settingsscreen.html",
  styleUrls: ["./window.characterscreen.css" , "./window.settingsscreen.css"]
})
export class SettingsScreenComponent {}
