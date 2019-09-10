export const stringToBool = str =>
  str && ['1', 'on', 't', 'true'].indexOf(str.toString().toLowerCase()) > -1;
