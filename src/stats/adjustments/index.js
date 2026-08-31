import { apply } from './apply';
import { adjustments as dbAdjustments } from './db';
import { adjustments as dlAdjustments } from './dl';
import { adjustments as lbAdjustments } from './lb';
// import { adjustments as teAdjustments } from './te';

const addTeamAdjustments = settings => ({ players = [], ...rest }) => {
  const adjustments = [
    ...dbAdjustments(settings)(players),
    ...dlAdjustments(settings)(players),
    ...lbAdjustments(settings)(players),
    // ...teAdjustments(settings)(players),
  ];

  return {
    ...rest,
    adjustments,
    players,
  };
};

const appendMatchupAdjustments = settings => ({ away, home, id }) => {
  const newAway = addTeamAdjustments(settings)(away);
  const newHome = addTeamAdjustments(settings)(home);

  return {
    away: newAway,
    home: newHome,
    id,
  };
};

export const addAdjustments = ({ matchups, settings }) =>
  matchups.map(appendMatchupAdjustments(settings));

export { apply };
