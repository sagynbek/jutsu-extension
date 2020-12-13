import { SKIP_VIDEO_INTRO } from "inject/constants";
import { BaseModel } from "inject/models/base-model";


export class SkipIntro<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(SKIP_VIDEO_INTRO, true, this.setPermition);
    this.onDomAttributeChange(this.validate, this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  validate = (element: T) => {
    return (
      this.permitted
      && element.nodeName === "DIV"
      && element.classList.contains("vjs-overlay-bottom-left")
      && !element.classList.contains("vjs-hidden")
      && element.innerText === "Пропустить заставку"
    );
  }

  action = (element: T) => {
    element.click();
  }
}
