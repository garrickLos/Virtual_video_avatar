import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "foldButtonComponent",
  imports: [NgClass],
  templateUrl: "./foldButton.component.html",
  styleUrls: ["./foldButton.component.css"]
})
export class FoldButtonComponent {
  @Input() buttonId: string = '';
}
