import { logFactory } from 'utils/log';
import { readEspnSettings, readLeagueSettings } from 'utils/settings';

const load = async () => {
  const log = logFactory('tloei:settings:load');

  log('⚙️ Loading settings files...');

  const espn = await readEspnSettings();
  const league = await readLeagueSettings();

  log('👍 Settings files loaded');

  return { espn, league };
};

export { load };
