export enum CONVERT_STATUS {
  INITIALIZED = 'initialized',
  PROGRESS = 'progress',
  ERROR = 'error',
  DONE = 'done',
}

export const FORMAT = {
  MP3: 1,
  MP4: 8,
  AVI: 5,
  MP4HD: 7,
  AVIHD: 9,
};

export const FORMAT_EXTENSION = {
  [FORMAT.MP3]: 'mp3',
  [FORMAT.MP4]: 'mp4',
  [FORMAT.AVI]: 'avi',
  [FORMAT.MP4HD]: 'mp4',
  [FORMAT.AVIHD]: 'avi',
};

export const BITRATE = {
  [FORMAT.MP3]: 192,
  [FORMAT.MP4]: 200,
  [FORMAT.AVI]: 202,
  [FORMAT.MP4HD]: 205,
  [FORMAT.AVIHD]: 207,
};

export const ALLOWED_FORMATS = [
  { id: FORMAT.MP3, name: FORMAT_EXTENSION[FORMAT.MP3] },
  { id: FORMAT.MP4, name: FORMAT_EXTENSION[FORMAT.MP4] },
];

export const REMOTE_CONVERTER = {
  REMOTE_BASE_URL: process.env.CONVERT_API_URL,
  AUTH: {
    USER: process.env.CONVERT_API_USER,
    PASS: process.env.CONVERT_API_PASSWORD,
  },
  SITEHOST_KEY: process.env.CONVERTER_SITEHOST_KEY,
};
