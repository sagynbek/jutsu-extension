export class UserPreference {
  async get<P>(preference: string, defaultValue: P) {
    return new Promise((resolve: (value: P) => void, reject) => {
      chrome.storage.sync.get([preference], (result) => {
        if (chrome.runtime.lastError) {
          reject(Error(chrome.runtime.lastError.message));
        }

        const value = result[preference];
        if (typeof (value) === "undefined") {
          this.set<P>(preference, defaultValue);
          resolve(defaultValue);
        }
        else {
          resolve(value);
        }
      });
    });
  }

  async set<P>(preference: string, value: P) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [preference]: value }, () => {
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve();
      });
    });
  }
}
