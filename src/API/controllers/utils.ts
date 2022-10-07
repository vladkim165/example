import { NextApiRequest } from 'next';
import { createHash } from 'crypto';
import { secureHashSalt } from './config';

// TODO актуализировать коды ошибок (это древняя штука еще когда conv_web был на php) (Приоритет 2/10)
export const getErrorMessage = (error_code: number | null) => {
  switch (error_code) {
    case 22:
      return 'too_long_youtube_error_title';
    case 33:
      return 'error_others';
    case 31:
    case 34:
    case 35:
      return 'error_others';

    case 500:
      return 'media_blocked_error';

    default:
      return 'error_others';
  }
};

export const isAllowedToAccess = async (req: NextApiRequest) => {
  return req.cookies.sh && (await isValidHash(req.headers['user-agent'] as string, req.cookies.sh));
};

const isValidHash = async (userAgent: string, requestHash: string) => {
  const encoder = new TextEncoder();
  const hash = createHash('sha256')
    .update(encoder.encode(`${secureHashSalt}_${userAgent}`))
    .digest('hex');

  return hash && hash === requestHash;
};
