import { getConfig } from 'config';
import isRoot from 'is-root';
import puppeteer from 'puppeteer';
import { mergeRight, uniq } from 'ramda';

let browser = null;

const { HEADLESS, PUPPETEER_ARGS } = getConfig();

const pArgs = () => {
  const args = ['--disable-infobars'];

  if (PUPPETEER_ARGS) {
    args.push(...PUPPETEER_ARGS.split(','));
  }

  if (isRoot()) {
    args.push('--no-sandbox');
  }

  return args;
};

const headless = HEADLESS;

const makeBrowser = async (overrides = {}) => {
  const options = mergeRight(
    {
      args: uniq(pArgs()),
      headless,
    },
    overrides
  );

  if (browser) return browser;

  // eslint-disable-next-line require-atomic-updates
  browser = await puppeteer.launch(options);

  return browser;
};

export { makeBrowser };
