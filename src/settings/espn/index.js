import { getConfig } from 'config';
import debug from 'debug';
import { Url, hydrate } from 'types/url';
import { readEspnSettings } from 'utils/settings';
import { seconds } from 'utils/time';
import { parse, waitExpression } from './parse';

const { REFRESH_SETTINGS } = getConfig();

// eslint-disable-next-line max-statements
const fetch = async page => {
  const log = debug('tloei:settings:espn');

  if (!REFRESH_SETTINGS) {
    try {
      const settings = await readEspnSettings();

      log('⚙️ ESPN settings loaded from cache');

      return settings;
    } catch (e) {
      //
    }
  }

  log(`👐 Fetching espn settings...`);
  await page.goto(hydrate(Url.SETTINGS));

  log(`⏲️ Waiting for page data...`);
  await page.waitForFunction(waitExpression, { timeout: seconds(5) });

  const output = await page.evaluate(parse);

  log(`👍 Espn settings returned.`);

  return output;
};

export { fetch };
