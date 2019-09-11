import debug from 'debug';
import { readEspnSettings, readLeagueSettings } from 'utils/settings';

const load = async () => {
  const log = debug('tloei:settings:load');

  log('⚙️ Loading settings files...');

  const espn = await readEspnSettings();
  const league = await readLeagueSettings();

  log('👍 Settings files loaded');

  return { espn, league };
};

export { load };
