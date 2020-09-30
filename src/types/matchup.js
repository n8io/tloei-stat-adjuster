import { pipe, reduce } from 'ramda';

const apiToUi = pipe(
  reduce(
    (acc, { away, home, id }) => [
      ...acc,
      {
        away: {
          adjustments: away.adjustments,
          players: away.players,
          teamId: away.teamId,
        },
        home: {
          adjustments: home.adjustments,
          players: home.players,
          teamId: home.teamId,
        },
        id,
      },
    ],
    []
  )
);

export const Matchup = {
  apiToUi,
};
