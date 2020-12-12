import { SkipIntro } from "./skip-intro";
import { NextEpisode } from "./next-episode";


export const initPlayer = () => {
  new SkipIntro();
  new NextEpisode();
};
