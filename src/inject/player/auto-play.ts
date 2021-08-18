import { BaseModel } from "inject/models/base-model";
import { AUTO_PLAY_VIDEO, WAIT_AUTO_PLAY_VIDEO_IN_MS } from "inject/constants";


export class AutoPlay<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(AUTO_PLAY_VIDEO.key, AUTO_PLAY_VIDEO.default, this.setPermition);
    this.onDomAdd(this.validate, this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  private validate = (element: T) => {
    return (
      this.permitted
      && element.nodeName === "DIV"
      && element.classList.contains("vjs-poster")
    );
  }

  private action = (element: T) => {
    setTimeout(() => {
      element.click();
    }, WAIT_AUTO_PLAY_VIDEO_IN_MS);
  }
}
