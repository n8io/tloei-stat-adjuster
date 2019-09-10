import { getConfig } from 'config';
import debug from 'debug';
import { Url } from 'types/url';
import updateDotEnv from 'update-dotenv';
import { seconds } from 'utils/time';
import { parse } from './parse';

// eslint-disable-next-line max-statements
const login = async page => {
  const log = debug('tloei:login');
  const uri = new URL(Url.LOGIN);
  const { ESPN_PASSWORD, ESPN_USERNAME } = getConfig();

  log(`Logging in at ${uri.href} ...`);

  try {
    await page.goto(uri.href);
    await page.waitFor(seconds(1));
    await page.keyboard.type(ESPN_USERNAME);
    await page.keyboard.press('Tab');
    await page.keyboard.type(ESPN_PASSWORD);

    page.keyboard.press('Enter');

    await page.waitForFunction(() => window.location.pathname === '/', 5000);

    const cookie = await page.evaluate(parse);

    await updateDotEnv({
      ESPN_SESSION_COOKIE: cookie,
    });

    log(`Logged in successfully`);

    return true;
  } catch (e) {
    log(`An error occurred while attempting to login`, e);

    return false;
  }
};

export { login };
