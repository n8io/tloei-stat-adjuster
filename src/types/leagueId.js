import { getConfig } from 'config';

const getCurrent = () => {
  const { ESPN_LEAGUE_ID } = getConfig();

  return parseInt(ESPN_LEAGUE_ID, 10);
};

const LeagueId = {
  getCurrent,
};

export { LeagueId };
