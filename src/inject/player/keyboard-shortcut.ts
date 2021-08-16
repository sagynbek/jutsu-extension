import { BaseModel } from "inject/models/base-model";


export class KeyboardShortcut<T extends HTMLDivElement> extends BaseModel<T> {
  constructor() {
    super();

    this.init();
  }

  private async init() {
    this.onKeyDown(['ф', 'Ф', 'f', 'F'], this.action);
  }

  private action = () => {
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
