import { isServer } from './common.utils';

export const parseUrlForVideoId = (url: string): { videoId: string; serviceId: string } | null => {
  if (!Boolean(url)) {
    return null;
  }

  const matchYt = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (matchYt) return { videoId: matchYt[1], serviceId: 'yt' };

  const matchFb = url.match(
    /(?:facebook\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([\d]+)/i
  );
  if (matchFb && matchFb[1]) return { videoId: matchFb[1], serviceId: 'fb' };

  const matchIg = url.match(/instagram.com\/p\/([a-z0-9_-]{11})/i);
  if (matchIg) return { videoId: matchIg[1], serviceId: 'ig' };

  const matchVimeo = url.match(
    /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
  );
  if (matchVimeo) return { videoId: matchVimeo[5], serviceId: 'vm' };

  return null;
};

export const convertValidator = {
  setStartConvert: () => {
    if (isServer()) throw new Error('Unavailable on server-side');

    document.cookie = 'isConvStarted=true; path=/; max-age=3600'; // started convert progress available 1 hours
  },
  progressIsAvailable: () => {
    if (isServer()) throw new Error('Unavailable on server-side');

    return document.cookie.includes('isConvStarted');
  },
};
