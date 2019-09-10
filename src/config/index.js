import dotEnv from 'dotenv-safe';
import { evolve, pipe } from 'ramda';
import { stringToBool } from 'utils/bool';
import { number } from 'utils/number';

dotEnv.config({
  allowEmptyValues: true,
});

// eslint-disable-next-line no-process-env
const config = Object.keys(process.env)
  .filter(
    k =>
      k.startsWith('ESPN_') ||
      [
        'APPLY_ADJUSTMENTS',
        'BITLY_API_KEY',
        'DEBUG',
        'GIST_TOKEN',
        'HEADLESS',
        'LOG_SCORING_ADJUSTMENTS',
        'LOG_TROPHIES',
        'NODE_ENV',
        'PRINT',
        'PUPPETEER_ARGS',
        'REFRESH_SETTINGS',
        'SEND_NOTIFICATIONS',
        'SLACK_CHANNEL',
        'SLACK_TOKEN',
      ].indexOf(k) > -1
  )
  // eslint-disable-next-line no-process-env
  .reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {});

const getConfig = () =>
  pipe(
    props => ({
      APPLY_ADJUSTMENTS: false,
      DEBUG: '',
      HEADLESS: true,
      PRINT: false,
      REFRESH_SETTINGS: false,
      SEND_NOTIFICATION: false,
      ...props,
    }),
    evolve({
      APPLY_ADJUSTMENTS: stringToBool,
      ESPN_LEAGUE_ID: number(),
      ESPN_SEASON_ID: number(),
      ESPN_WEEK_ID: number(-1),
      HEADLESS: stringToBool,
      PRINT: stringToBool,
      REFRESH_SETTINGS: stringToBool,
      SEND_NOTIFICATION: stringToBool,
    })
  )(config);

export { getConfig };
