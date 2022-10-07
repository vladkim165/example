import { setContent, setStatus } from '../store/contentStore';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import Page from '../mongoDB/models/Page';
import logger from './logger';
import withConnectedDB from '../API/controllers/HOC/withDB';
import { STATUS } from '../store/contentStore/types';

// TODO привести к единому виду код, перенести сюда из getStaticProps со страницы лист запрос (Приоритет 2/10)
// имя файла store.server.utils.ts потом можно будет и поменять, чтоб соответствовало тому, что внутри

type DispatchT = ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>;

type UpdateContentProps = { dispatch: DispatchT; locale: string; pageName: string };

export const updateContent = await withConnectedDB(
  async ({ dispatch, locale, pageName }: UpdateContentProps) => {
    try {
      dispatch(setStatus(STATUS.loading));
      const content = await Page.findOne({
        name: pageName,
        lang: locale,
      });

      if (!content) {
        throw new Error('Cannot find content for this page');
      }

      dispatch(setContent(JSON.parse(JSON.stringify(content))));
      dispatch(setStatus(STATUS.succeeded));
    } catch (e: any) {
      logger.error(e);
      dispatch(setStatus(STATUS.failed));
    }
  }
);
