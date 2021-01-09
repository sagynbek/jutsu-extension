import { SkipIntro } from "./skip-intro";
import { NextEpisode } from "./next-episode";
import { AutoPlay } from "./auto-play";
import { VideoSpeed } from "./video-speed";
import { FullScreen } from "./full-screen";


export const initPlayer = () => {
  new SkipIntro();
  new NextEpisode();
  new AutoPlay();
  new VideoSpeed();
  // new FullScreen(); // Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture
};
