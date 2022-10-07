import mongoose from 'mongoose';

import { defaultLocale } from '../../config/locales.config';

const PageSchema = new mongoose.Schema({
  // Пока простая схема не вижу смысла делить на компоненты но если вдруг разрастется проект то это будет проблемой
  name: {
    type: String,
    trim: true,
  },
  lang: {
    type: String,
    default: defaultLocale,
    trim: true,
  },
  seo: {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    keywords: {
      type: String,
      trim: true,
    },
  },
  h1: {
    type: String,
    trim: true,
  },
  tags: {
    title: { type: String },
    list: [
      {
        href: {
          // Mixed type ?
          type: String,
          trim: true,
        },
        text: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  teasers: {
    list: [
      {
        title: {
          type: String,
          trim: true,
        },
        text: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  about: {
    colored: { type: Boolean },
    list: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  bottomMenu: [
    {
      href: {
        type: String,
        trim: true,
      },
      text: {
        type: String,
        trim: true,
      },
    },
  ],
  isFaq: {
    type: Boolean,
  },
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
