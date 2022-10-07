export const isBetween = (length: number, min: number, max: number) =>
  !(length < min || length > max);

export const isEmailValid = (email: string) => {
  const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return re.test(email);
};
