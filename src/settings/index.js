import { getConfig } from 'config';
import { pipe, prop, toString } from 'ramda';
import updateDotEnv from 'update-dotenv';
import { fetch as fetchEspnSettings } from './espn';
import { fetch as fetchLeagueSettings } from './league';

let espn = null;
let league = null;
const players = null;
const { ESPN_WEEK_ID } = getConfig();

const load = async page => {
  if (!espn) {
    // eslint-disable-next-line require-atomic-updates
    espn = await fetchEspnSettings(page);
  }

  if (!league) {
    // eslint-disable-next-line require-atomic-updates
    league = await fetchLeagueSettings();
  }

  if (ESPN_WEEK_ID === -1) {
    await updateDotEnv({
      ESPN_WEEK_ID: pipe(
        prop('scoringPeriodId'),
        toString
      )(league),
    });
  }

  return { espn, league, players };
};

export { load };
