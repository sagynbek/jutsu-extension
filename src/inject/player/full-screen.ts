import { BaseModel } from "inject/models/base-model";
import { FULL_SCREEN } from "inject/constants";


export class FullScreen<T extends HTMLDivElement> extends BaseModel<T> {
  permitted = true;
  constructor() {
    super();

    this.init();
  }

  private async init() {
    await this.subscribeToPreference(FULL_SCREEN.key, FULL_SCREEN.default, this.setPermition);
    this.onKeyDown(['ф', 'Ф', 'f', 'F'], this.action);
  }

  private setPermition = (permission) => {
    this.permitted = permission;
  }

  private action = () => {
    if (!this.permitted) { return; }

    this.getFullScreenButton()?.click();
  }

  private getFullScreenButton = (): HTMLButtonElement | null => {
    let buttons = document.getElementsByClassName("vjs-fullscreen-control");

    if (buttons.length > 0) {
      return buttons[0] as HTMLButtonElement;
    }
    return null;
  }
}
