import { Component } from "@angular/core";
import { Talking } from "./setting.talkingButtonAction";

@Component({
  selector: "talkingButton",
  templateUrl: "./talking-button.component.html",
  styleUrl: "./talking-button.component.css",
})
export class talkingButtonComponent {
  isTalking = false;

  startTalking(): void {
    this.isTalking = !this.isTalking;
    console.log(this.isTalking ? "Talking" : "Shutting up!");
    Talking(this.isTalking);
  }
}
