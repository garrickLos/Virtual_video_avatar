import { Component } from "@angular/core";
import { Talking } from "./setting.talkin-Button.Action";
import { ButtonComponent } from "../button.component"; 

import { TalkingButtonState } from "./talking-button.interfaces";

@Component({
  selector: "talkingButton",
  imports: [ButtonComponent],
  templateUrl: "./talking-button.component.html",
  styleUrls: ["../button.component.css", "./talking-button.component.css"],
})
export class talkingButtonComponent {
  state: TalkingButtonState = { isTalking: false };
  startTalking(): void {
    this.state.isTalking = !this.state.isTalking;
    console.log(this.state.isTalking ? "Talking" : "Shutting up!");
    Talking(this.state);
  }
}
