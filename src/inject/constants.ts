export interface IConstant {
  key: string,
  default: boolean | number,
}

export const SKIP_VIDEO_INTRO = { key: "SKIP_VIDEO_INTRO", default: true };
export const OPEN_NEXT_VIDEO = { key: "OPEN_NEXT_VIDEO", default: true };
export const AUTO_PLAY_VIDEO = { key: "AUTO_PLAY_VIDEO", default: true };
export const VIDEO_SPEED = { key: "VIDEO_SPEED", default: 1 };

export const PLAYER_ACTION_TIMEOUT_IN_MS = 700;
