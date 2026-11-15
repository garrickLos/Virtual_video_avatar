import { Component } from "@angular/core";
import { ButtonComponent } from "./button.component";
import { getCurrentWindow } from "@tauri-apps/api/window";

@Component({
  selector: "app-window-controls",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./window-controls.component.html",
  styleUrl: "./window-controls.component.css",
})
export class WindowControlsComponent {
  minimize(): Promise<void> {
    return getCurrentWindow().minimize();
  }

  maximize(): Promise<void> {
    return getCurrentWindow().toggleMaximize();
  }

  close(): Promise<void> {
    return getCurrentWindow().close();
  }

  startDragging(event: MouseEvent): Promise<void> | undefined {
    if (
      event.target instanceof Element &&
      event.target.closest(".window-controls")
    ) {
      return;
    }

    return getCurrentWindow().startDragging();
  }
}
