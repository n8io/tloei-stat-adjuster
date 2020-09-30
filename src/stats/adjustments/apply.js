import { getConfig } from 'config';
import { Adjustment } from 'types/adjustment';
import { hydrate, Url } from 'types/url';
import { log } from 'utils/log';
import { post } from 'utils/post';
import { save as saveGoogle } from './google';
import { notify } from './notify';

const { APPLY_ADJUSTMENTS, NOTIFY } = getConfig();

// eslint-disable-next-line max-statements
const apply = async ({ matchups, weekId }) => {
  const adjustments = Adjustment.uiToApi(matchups);

  if (!Adjustment.hasValidAdjustments(adjustments)) {
    log(`🚫 No stat adjustments to apply.`);

    return;
  } else if (!APPLY_ADJUSTMENTS) {
    log(
      `⚠️ **** DRY RUN Week ${weekId} stat adjustments were NOT applied *** ️️⚠️`
    );

    return;
  }

  const url = new URL(hydrate(Url.API_SCORE_ADJUSTMENT));

  log(`🔢 Applying stat adjustments ${url.href}...`);
  await post(url.href, adjustments);
  log(`👍 Stat adjustments applied`);

  const dataAdjustments = Adjustment.matchupsToAdjustments(matchups);
  const logUrl = await saveGoogle({ adjustments: dataAdjustments, weekId });

  NOTIFY && await notify({url: logUrl, weekId});
};

export { apply };
