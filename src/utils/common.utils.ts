export const isEmpty = (obj: any) => {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
};

export const isServer = () => typeof window === 'undefined';
