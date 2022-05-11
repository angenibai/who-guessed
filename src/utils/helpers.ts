export const isAlphaNumeric = (str: string) => {
  return str.match(/^[A-Z0-9]+$/i) !== null;
};
