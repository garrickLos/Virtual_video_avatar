export function Talking(isTalkingState: boolean): void {
    const talkingButton = document.querySelector(".talking_button");

    talkingButton?.classList.toggle("listening");

    console.log(isTalkingState);
}