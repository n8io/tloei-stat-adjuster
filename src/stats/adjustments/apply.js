import { getConfig } from 'config';
import debug from 'debug';
import { Adjustment } from 'types/adjustment';
import { hydrate, Url } from 'types/url';
import { post } from 'utils/post';

const { APPLY_ADJUSTMENTS } = getConfig();

const apply = async ({ matchups, weekId }) => {
  const log = debug('tloei:stats:adjustments:apply');

  if (!APPLY_ADJUSTMENTS) {
    log(
      `⚠️ **** DRY RUN Week ${weekId} stat adjustments were NOT applied *** ️️⚠️`
    );

    return;
  }

  const url = new URL(hydrate(Url.API_SCORE_ADJUSTMENT));

  const payload = Adjustment.uiToApi(matchups);

  log(`🔢 Applying stat adjustments ${url.href}...`);
  await post(url.href, payload);

  log(`👍 Stat adjustments applied`);
};

export { apply };

// [{"away":{"adjustment":0,"adjustmentReason":"","teamId":1},"home":{"adjustment":0,"adjustmentReason":"","teamId":5},"id":3}]
