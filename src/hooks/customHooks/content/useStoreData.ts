import { useAppSelector } from '../../reduxHooks';
import { selectContent, selectStatus } from '../../../store/contentStore';

export const useSeo = () => {
  const { seo } = useAppSelector(selectContent);

  return seo;
};

export const useTags = () => {
  const { tags } = useAppSelector(selectContent);

  return tags;
};

export const useTitle = () => {
  const { h1 } = useAppSelector(selectContent);

  return h1 || '';
};

export const useTeasers = () => {
  const { teasers } = useAppSelector(selectContent);

  return teasers;
};

// TODO подумать о проверке статуса запроса контента внутри компонента (Приоритет 5/10)
export const useStatus = () => {
  const status = useAppSelector(selectStatus);

  return status;
};
