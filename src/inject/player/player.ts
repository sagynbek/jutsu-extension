import { SkipIntro } from "./skip-intro";
import { NextEpisode } from "./next-episode";
import { AutoPlay } from "./auto-play";
import { VideoSpeed } from "./video-speed";
import { AutoFullScreen } from "./auto-full-screen";
import { KeyboardShortcut } from "./keyboard-shortcut";


export const initPlayer = () => {
  new SkipIntro();
  new NextEpisode();
  new AutoPlay();
  new VideoSpeed();
  new KeyboardShortcut();
  new AutoFullScreen();
};
