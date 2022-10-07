interface AboutPropsListItem {
  title?: string;
  text?: string;
}
interface AboutProps {
  list?: AboutPropsListItem[];
  colored?: boolean;
}
interface SeoPropsOgTag {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  og?: SeoPropsOgTag;
  path: string;
  noIndex: boolean;
}

interface TagPropsListItem {
  href?: string;
  text?: string;
}
interface TagProps {
  title?: string;
  list: TagPropsListItem[];
}

export interface Content {
  lang: string;
  seo: SeoProps;
  h1: string;
  tags: TagProps;
  teasers: AboutProps;
  about: any;
  bottomMenu: any;
  isFaq: boolean;
}

export enum STATUS {
  idle,
  loading,
  succeeded,
  failed,
}

export interface ContentStore {
  content: Content;
  status: STATUS;
}
