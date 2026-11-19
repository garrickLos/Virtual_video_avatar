import { Component, Input } from "@angular/core";

@Component({
  selector: "foldButtonComponent",
  templateUrl: "./foldButton.component.html",
  styleUrls: ["./foldButton.component.css"],
})
export class FoldButtonComponent {
  @Input() buttonId: string = '';
}
