import { SKIP_VIDEO_INTRO } from "inject/constants";
import { BaseModel } from "inject/models/base-model";


export class SkipIntro<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    this.permitted = await this.getPreference(SKIP_VIDEO_INTRO, true);
    this.onDomAttributeChange(this.validate, this.action);
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
    this.permitted = false;
    element.click();
  }
}
