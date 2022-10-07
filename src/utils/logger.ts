import { isProd } from '../config/site.config';

const logger = {
  log: (...messages: any[]) => {
    if (!isProd) {
      console.log(...messages);
    }
  },

  error: (...messages: any[]) => {
    if (!isProd) {
      console.error(...messages);
    }
  },
};

export default logger;
