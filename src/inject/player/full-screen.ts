import { BaseModel } from "inject/models/base-model";
import { FULL_SCREEN, PLAYER_ACTION_TIMEOUT_IN_MS } from "inject/constants";


export class FullScreen<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(FULL_SCREEN.key, FULL_SCREEN.default, this.setPermition);
    this.onDomAdd(this.validate, this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  private validate = (element: T) => {
    return (
      this.permitted
      && element.nodeName === "DIV"
      && element.id == "my-player"
      && !!this.getFullScreenButton(element)
    );
  }

  private action = (element: T) => {
    setTimeout(() => {
      this.getFullScreenButton(element).click();
    }, PLAYER_ACTION_TIMEOUT_IN_MS);
  }

  private getFullScreenButton = (element: T): HTMLButtonElement => {
    return (element.getElementsByClassName("vjs-fullscreen-control")[0]) as HTMLButtonElement;
  }
}
