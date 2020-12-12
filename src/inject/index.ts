// import { themeRunner } from './theme/site-theme';
import { initPlayer } from "./player/player";


initPlayer();
// themeRunner();
chrome.runtime.sendMessage({ "message": "activate_icon" });
