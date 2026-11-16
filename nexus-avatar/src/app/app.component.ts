import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { WindowControlsComponent } from "./components/window-controls.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, WindowControlsComponent],
  template: "<app-window-controls /><router-outlet />",
})
export class AppComponent {}
