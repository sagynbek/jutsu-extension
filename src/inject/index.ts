import { initPlayer } from "./player/player";


initPlayer();
chrome.runtime.sendMessage({ "message": "activate_icon" });
