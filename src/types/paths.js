import { join } from 'path';

const DIR_SETTINGS = join(__dirname, '../../tmp');
const SETTINGS_ESPN = join(DIR_SETTINGS, 'espn.json');
const SETTINGS_LEAGUE = join(DIR_SETTINGS, 'league.json');
const SETTINGS_PLAYERS = join(DIR_SETTINGS, 'players.json');

export const Path = {
  SETTINGS_ESPN,
  SETTINGS_LEAGUE,
  SETTINGS_PLAYERS,
  TEMP_DIR: DIR_SETTINGS,
};
