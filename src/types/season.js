import { getConfig } from 'config';

const getCurrent = () => {
  const { ESPN_SEASON_ID } = getConfig();

  return parseInt(ESPN_SEASON_ID, 10);
};

const Season = {
  getCurrent,
};

export { Season };
