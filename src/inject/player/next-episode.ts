import { BaseModel } from "inject/models/base-model";
import { OPEN_NEXT_VIDEO } from "inject/constants";


export class NextEpisode<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    this.permitted = await this.getPreference(OPEN_NEXT_VIDEO, true);
    this.onDomAttributeChange(this.validate, this.action);
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
