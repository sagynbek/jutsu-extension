import { BaseModel } from "inject/models/base-model";
import { AUTO_PLAY_VIDEO, FULL_SCREEN, NEXT_EPISODE_LAST_TRIGGER_TIME } from "inject/constants";
import { getOffset, scrollTop } from "inject/utils/dom";

const CSS_FULL_SCREEN_CLASS = "simulate-fullscreen";
const TOLERATE_AUTO_FULL_SCREEN_IN_MS = 30 * 1000;

export class AutoFullScreen<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  autoPlayPermitted = true;
  nextEpisodeLastTriggerTimeFitsTime = false;

  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(FULL_SCREEN.key, FULL_SCREEN.default, this.setPermition);
    await this.subscribeToPreference(AUTO_PLAY_VIDEO.key, AUTO_PLAY_VIDEO.default, this.setAutoPlayPermition);
    await this.subscribeToPreference(NEXT_EPISODE_LAST_TRIGGER_TIME.key, NEXT_EPISODE_LAST_TRIGGER_TIME.default, this.handleLastTriggerTime);

    this.onDomAdd(this.validate, this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  private setAutoPlayPermition = (permission) => {
    this.autoPlayPermitted = permission;
  }

  private handleLastTriggerTime = (lastTriggerTime) => {
    // @ts-ignore
    if (lastTriggerTime && (new Date() - new Date(lastTriggerTime)) < TOLERATE_AUTO_FULL_SCREEN_IN_MS) {
      this.nextEpisodeLastTriggerTimeFitsTime = true;
    }
  }

  private validate = (element: T) => {
    return (
      this.permitted
      && this.autoPlayPermitted
      && this.nextEpisodeLastTriggerTimeFitsTime
      && element.nodeName === "VIDEO"
      && element.id === "my-player_html5_api"
    );
  }

  private action = (element: T) => {
    const { top } = getOffset(element);
    scrollTop(top);

    const bodyElement = document.querySelector("body");
    bodyElement.classList.add(CSS_FULL_SCREEN_CLASS);

    document.addEventListener("mousedown", this.exitCssFullScreen);
    document.addEventListener("keyup", (e) => {
      // F11's keycode = 122
      if (e.keyCode !== 122) {
        this.exitCssFullScreen();
      }
    });
  }

  private exitCssFullScreen = () => {
    const element = document.querySelector("body");
    element.classList.remove(CSS_FULL_SCREEN_CLASS);
  }
}
