import { VIDEO_SPEED } from "inject/constants";
import { BaseModel } from "inject/models/base-model";


export class VideoSpeed<T extends HTMLVideoElement> extends BaseModel<T> {
  speed = 1;
  videoElement?: T;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(VIDEO_SPEED.key, VIDEO_SPEED.default, this.setVideoSpeed);
    this.onDomAdd(this.validate, this.action);
  }

  private setVideoSpeed = (speed) => {
    this.speed = speed;
    this.updateVideoSpeed();
  }

  validate = (element: T) => {
    return (
      element.nodeName === "VIDEO"
      && element.id === "my-player_html5_api"
    );
  }

  action = (element: T) => {
    this.videoElement = element;
    this.videoElement.addEventListener("play", this.updateVideoSpeed);
    this.updateVideoSpeed();
  }

  updateVideoSpeed = () => {
    if (!this.videoElement) { return; }

    this.videoElement.playbackRate = this.speed;
  }
}
