import { AUTO_PLAY_VIDEO, IConstant, OPEN_NEXT_VIDEO, SKIP_VIDEO_INTRO, VIDEO_SPEED } from "inject/constants";
import { UserPreference } from "inject/models/user-preference";


interface IConfig {
  id: string,
  preference: IConstant,
  type: "checkbox" | "slider"
}

const userPreference = new UserPreference();
const configs: IConfig[] = [
  { id: "skip-recap", preference: SKIP_VIDEO_INTRO, type: "checkbox" },
  { id: "next-episode", preference: OPEN_NEXT_VIDEO, type: "checkbox" },
  { id: "auto-play", preference: AUTO_PLAY_VIDEO, type: "checkbox" },
  { id: "video-speed", preference: VIDEO_SPEED, type: "slider" }
]

function localizeHtmlPage() {
  // Localize by replacing __MSG_***__ meta tags
  const objects = document.getElementsByTagName("html");
  for (let j = 0; j < objects.length; j++) {
    const obj = objects[j];

    const valStrH = obj.innerHTML.toString();
    const valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : "";
    });

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}

function onCheckboxChange(e, key: string) {
  const isChecked = e.target.checked;
  userPreference.set(key, isChecked);
}

function onSliderChange(e, key: string, indicator: HTMLElement) {
  userPreference.set(key, e.target.value);
  setSliderIndicatorValue(indicator, e.target.value);
}

function setSliderIndicatorValue(indicator: HTMLElement, value: number | boolean) {
  indicator.innerText = "x" + value;
}

function setCheckboxValue(checkbox: HTMLElement, value: number | boolean) {
  (checkbox as HTMLInputElement).checked = !!value;
}

function setSliderValue(slider: HTMLElement, value: number | boolean) {
  (slider as HTMLInputElement).value = value.toString();
}

async function initialize() {
  for (let it = 0; it < configs.length; it++) {
    const { id, preference, type } = configs[it];

    const element = document.getElementById(id);
    const preferedValue = await userPreference.get(preference.key, preference.default);

    if (type === "checkbox") {
      setCheckboxValue(element, preferedValue);
      element.addEventListener("change", (e) => { onCheckboxChange(e, preference.key) });
    }
    else if (type === "slider") {
      const indicatorElement = document.getElementById(id + "-indicator");
      setSliderValue(element, preferedValue);
      setSliderIndicatorValue(indicatorElement, preferedValue);

      element.addEventListener("input", (e) => { onSliderChange(e, preference.key, indicatorElement) });
    }
  }
}

function setupResetButton() {
  const resetConfigButton = document.getElementById("reset-config");

  resetConfigButton.onclick = () => {
    for (let it = 0; it < configs.length; it++) {
      const { id, preference, type } = configs[it];
      const element = document.getElementById(id);

      userPreference.set(preference.key, preference.default);
      if (type === "checkbox") {
        setCheckboxValue(element, preference.default);
      }
      else if (type === "slider") {
        const indicatorElement = document.getElementById(id + "-indicator");
        setSliderValue(element, preference.default);
        setSliderIndicatorValue(indicatorElement, preference.default);
      }
    }
  }
}

(async () => {
  localizeHtmlPage();

  initialize();
  setupResetButton();
})();
