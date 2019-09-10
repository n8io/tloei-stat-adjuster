import { writeJson } from 'fs-extra';
import { join } from 'path';
import { Path } from 'types/paths';

const spaces = 2;

export const saveSettings = ({ espn, league, players }) =>
  Promise.all([
    writeJson(Path.SETTINGS_ESPN, espn, { spaces }),
    writeJson(Path.SETTINGS_LEAGUE, league, { spaces }),
    writeJson(Path.SETTINGS_PLAYERS, players, { spaces }),
  ]);

export const saveMatchups = matchups =>
  writeJson(join(Path.TEMP_DIR, 'matchups.json'), matchups, { spaces });

export const saveAdjustments = async matchups => {
  const adjustments = matchups.reduce(
    (acc, { away, home, id }) => [
      ...acc,
      {
        away: {
          adjustments: away.adjustments,
          teamId: away.teamId,
        },
        home: {
          adjustments: home.adjustments,
          teamId: home.teamId,
        },
        id,
      },
    ],
    []
  );

  await writeJson(join(Path.TEMP_DIR, 'adjustments.json'), adjustments, {
    spaces,
  });

  return adjustments;
};
