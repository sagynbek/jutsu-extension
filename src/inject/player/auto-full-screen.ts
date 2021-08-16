import { BaseModel } from "inject/models/base-model";
import { AUTO_PLAY_VIDEO, FULL_SCREEN } from "inject/constants";
import { getOffset, scrollTop } from "inject/utils/dom";

const CSS_FULL_SCREEN_CLASS = "simulate-fullscreen";

export class AutoFullScreen<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  autoPlayPermitted = true;

  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(FULL_SCREEN.key, FULL_SCREEN.default, this.setPermition);
    await this.subscribeToPreference(AUTO_PLAY_VIDEO.key, AUTO_PLAY_VIDEO.default, this.setAutoPlayPermition);
    this.onDomAdd(this.validate, this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  private setAutoPlayPermition = (permission) => {
    this.autoPlayPermitted = permission;
  }

  private validate = (element: T) => {
    return (
      this.permitted
      && this.autoPlayPermitted
      && element.nodeName === "VIDEO"
      && element.id === "my-player_html5_api"
    );
  }

  private action = (element: T) => {
    const { top } = getOffset(element);
    scrollTop(top);

    element.classList.add(CSS_FULL_SCREEN_CLASS);
    document.addEventListener("mousedown", () => { this.exitCssFullScreen(element) });
    document.addEventListener("keyup", (e) => { this.exitCssFullScreen(element) });
  }

  private exitCssFullScreen = (element: T) => {
    element.classList.remove(CSS_FULL_SCREEN_CLASS);
  }
}
