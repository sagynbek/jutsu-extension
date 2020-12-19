import { AUTO_PLAY_VIDEO, OPEN_NEXT_VIDEO, SKIP_VIDEO_INTRO, VIDEO_SPEED } from "inject/constants";
import { UserPreference } from "inject/models/user-preference";


const userPreference = new UserPreference();

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

function setSliderIndicatorValue(indicator: HTMLElement, value) {
  indicator.innerText = "x" + value;
}

function setCheckboxValue(checkbox: HTMLElement, value) {
  if (value) { checkbox.setAttribute("checked", "true"); }
  else { checkbox.removeAttribute("checked"); }
}

function setSliderValue(slider: HTMLElement, value) {
  slider.setAttribute("value", value);
}

(async () => {
  localizeHtmlPage();

  const skipRecapElement = document.getElementById("skip-recap");
  const nextEpisodeElement = document.getElementById("next-episode");
  const autoPlayElement = document.getElementById("auto-play");
  const videoSpeedElement = document.getElementById("video-speed");
  const videoSpeedIndicatorElement = document.getElementById("video-speed-indicator")



  const shouldSkip = await userPreference.get(SKIP_VIDEO_INTRO.key, SKIP_VIDEO_INTRO.default);
  const shouldOpenNextEpisode = await userPreference.get(OPEN_NEXT_VIDEO.key, OPEN_NEXT_VIDEO.default);
  const shouldAutoPlay = await userPreference.get(AUTO_PLAY_VIDEO.key, AUTO_PLAY_VIDEO.default);
  const videoSpeed = await userPreference.get(VIDEO_SPEED.key, VIDEO_SPEED.default);


  setCheckboxValue(skipRecapElement, shouldSkip);
  setCheckboxValue(nextEpisodeElement, shouldOpenNextEpisode);
  setCheckboxValue(autoPlayElement, shouldAutoPlay);
  setSliderValue(videoSpeedElement, videoSpeed);
  setSliderIndicatorValue(videoSpeedIndicatorElement, videoSpeed);


  skipRecapElement.addEventListener("change", (e) => { onCheckboxChange(e, SKIP_VIDEO_INTRO.key) });
  nextEpisodeElement.addEventListener("change", (e) => { onCheckboxChange(e, OPEN_NEXT_VIDEO.key) });
  autoPlayElement.addEventListener("change", (e) => { onCheckboxChange(e, AUTO_PLAY_VIDEO.key) });
  videoSpeedElement.addEventListener("change", (e) => { onSliderChange(e, VIDEO_SPEED.key, videoSpeedIndicatorElement) });
})();
