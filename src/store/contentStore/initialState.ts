import { defaultLocale } from '../../config/locales.config';
import { ContentStore, STATUS } from './types';

const initialState: ContentStore = {
  content: {
    lang: defaultLocale,
    // @ts-ignore
    seo: {},
    h1: '',
    // @ts-ignore
    tags: [],
    // @ts-ignore
    teasers: [],
    about: [],
    bottomMenu: [],
    isFaq: false,
  },
  status: STATUS.idle,
};

export default initialState;
