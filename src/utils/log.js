export const logFactory = key => {
  // eslint-disable-next-line no-console
  return message => console.log(`${new Date().toISOString()}: ${message}`);
};
