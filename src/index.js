import { getConfig } from 'config';
import { login } from 'login';
import { load as loadSettings } from 'settings';
import { process } from 'stats';
import { makeBrowser, makePage } from 'utils/puppeteer';

(async () => {
  const browser = await makeBrowser();
  const page = await makePage(browser);

  try {
    await login(page);

    const settings = await loadSettings(page);

    await process({ page, settings, weekId: getConfig().ESPN_WEEK_ID });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    if (browser) browser.close();
  }
})();
