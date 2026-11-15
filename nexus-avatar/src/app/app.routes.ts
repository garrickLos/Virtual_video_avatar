import { Routes } from "@angular/router";
import { CharacterScreenComponent } from "./window.characterScreen";
import { SettingsScreenComponent } from "./window.settingsscreen";

export const routes: Routes = [
  { path: "", component: CharacterScreenComponent, pathMatch: "full" },
  { path: "settings", component: SettingsScreenComponent },
  { path: "**", redirectTo: "" },
];
