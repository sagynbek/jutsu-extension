import { BaseModel } from "inject/models/base-model";
import { OPEN_NEXT_VIDEO } from "inject/constants";


export class NextEpisode<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(OPEN_NEXT_VIDEO.key, OPEN_NEXT_VIDEO.default, this.setPermition);
    this.onDomAttributeChange(this.validate, this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  private validate = (element: T) => {
    return (
      this.permitted
      && element.nodeName === "DIV"
      && element.classList.contains("vjs-overlay-bottom-right")
      && !element.classList.contains("vjs-hidden")
      && element.innerText === "Следующая серия"
    );
  }

  private action = (element: T) => {
    element.click();
  }
}
