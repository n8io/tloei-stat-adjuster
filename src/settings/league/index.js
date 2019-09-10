import { getConfig } from 'config';
import debug from 'debug';
import { LeagueView } from 'types/leagueViews';
import { Url, hydrate } from 'types/url';
import { fetch as fetchJson } from 'utils/fetch';
import { readLeagueSettings } from 'utils/settings';

const { REFRESH_SETTINGS } = getConfig();

// eslint-disable-next-line max-statements
export const fetch = async () => {
  const log = debug('tloei:settings:league');

  if (!REFRESH_SETTINGS) {
    try {
      const settings = await readLeagueSettings();

      log('⚙️ League settings loaded from cache');

      return settings;
    } catch (e) {
      //
    }
  }

  const tempUrl = new URL(hydrate(Url.API_LEAGUE_SETTINGS));

  tempUrl.searchParams.set(LeagueView.SEARCH_PARAM_NAME, LeagueView.SETTINGS);

  const url = `${tempUrl.href}&${LeagueView.SEARCH_PARAM_NAME}=${LeagueView.MEMBERS}`;

  log(`👐 Fetching league settings from ${url} ...`);

  const output = await fetchJson(url);

  log(`👍 League settings returned.`);

  return output;
};
