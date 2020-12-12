import { DomObserver } from "./dom-observer";
import { UserPreference } from "./user-preference";

export abstract class BaseModel<T extends Node>{
  private userPreference: UserPreference;
  private domObserver: DomObserver;
  constructor() {
    this.userPreference = new UserPreference();
    this.domObserver = DomObserver.getInstance();
  }

  protected async getPreference<P>(preference: string, defaultValue: P) {
    return await this.userPreference.get<P>(preference, defaultValue);
  }

  protected onDomAttributeChange(validate: (node: T) => boolean, callback: (node: T) => void) {
    this.domObserver.subscribe(validate, callback, "attributes");
  }
  protected onDomAdd(validate: (node: T) => boolean, callback: (node: T) => void) {
    this.domObserver.subscribe(validate, callback, "add");
  }
  protected onDomRemove(validate: (node: T) => boolean, callback: (node: T) => void) {
    this.domObserver.subscribe(validate, callback, "remove");
  }
}
