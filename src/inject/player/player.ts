import { SkipIntro } from "./skip-intro";
import { NextEpisode } from "./next-episode";
import { AutoPlay } from "./auto-play";


export const initPlayer = () => {
  new SkipIntro();
  new NextEpisode();
  new AutoPlay();
};
