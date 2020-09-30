import { Adjustment } from 'types/adjustment';
import { shorten } from 'utils/bitly';
import { initialize, workbookUrl } from 'utils/google';
import { getSheet, reset } from 'utils/google/worksheet';
import { log } from 'utils/log';

// eslint-disable-next-line max-statements
const saveScoringAdjustments = ({ doc, weekId }) => async adjustments => {
  const newData = Adjustment.adjustmentsToGoogle(weekId)(adjustments);
  const sheet = await getSheet(doc, `Week ${weekId}`);

  log(`🧹 Clearing adjustments log for week ${weekId}...`);
  await reset(sheet);
  log(`👍 Adjustment log cleared.`);

  log(`💾 Saving existing adjustments log for week ${weekId}...`);
  await sheet.addRows(newData);
  log(`🏁 Adjustments log saved.`);

  return sheet.sheetId;
};

const save = async ({ adjustments, weekId }) => {
  const doc = await initialize();
  const logScoringAdjustments = saveScoringAdjustments({ doc, weekId });
  const sheetId = await logScoringAdjustments(adjustments);
  const url = await shorten(workbookUrl(sheetId));

  log(`🔗 Adjustments log for Week ${weekId} saved to ${url}`);

  return url;
};

export { save };
