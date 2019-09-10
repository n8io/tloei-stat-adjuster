import { getConfig } from 'config';
import { saveAdjustments, saveMatchups, saveSettings } from 'utils/file';
import { fetch as fetchWeekScores } from '../scores';
import { addAdjustments, apply } from './adjustments';
import { print } from './adjustments/print';

export const process = async ({ page, settings, weekId }) => {
  await saveSettings(settings);

  const matchups = await fetchWeekScores({ settings, weekId });

  const amendedMatchups = addAdjustments({ matchups, settings });

  await saveMatchups(amendedMatchups);

  const slimMatchups = await saveAdjustments(amendedMatchups);

  getConfig().PRINT && print({ matchups: slimMatchups, settings });

  await apply({ matchups: slimMatchups, page, weekId });
};
