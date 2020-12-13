import { OPEN_NEXT_VIDEO, SKIP_VIDEO_INTRO } from "inject/constants";
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

function setCheckboxValue(checkbox: HTMLElement, value) {
  if (value) { checkbox.setAttribute("checked", "true"); }
  else { checkbox.removeAttribute("checked"); }
}

(async () => {
  localizeHtmlPage();

  const skipRecapElement = document.getElementById("skip-recap");
  const nextEpisodeElement = document.getElementById("next-episode");


  const shouldSkip = await userPreference.get(SKIP_VIDEO_INTRO, true);
  const shouldOpenNextEpisode = await userPreference.get(OPEN_NEXT_VIDEO, true);

  setCheckboxValue(skipRecapElement, shouldSkip);
  setCheckboxValue(nextEpisodeElement, shouldOpenNextEpisode);


  skipRecapElement.addEventListener("change", (e) => { onCheckboxChange(e, SKIP_VIDEO_INTRO) });
  nextEpisodeElement.addEventListener("change", (e) => { onCheckboxChange(e, OPEN_NEXT_VIDEO) });
})();
