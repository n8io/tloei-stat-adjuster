import { join, map, pipe, prop, sum } from 'ramda';
import { Bonus } from './bonus';

const sumAdjustments = pipe(
  prop('adjustments'),
  map(prop('bonus')),
  sum
);

const adjustementToPrint = ({ bonus, player, type }) => {
  const { firstName, lastName } = player;

  return `${firstName} ${lastName} ${type} = ${bonus}`;
};

const formatAdjustmentReasons = pipe(
  map(adjustementToPrint),
  join(' / ')
);

const matchupToAdjustment = ({ away, home, id: matchupId }) => {
  const aAdjustment = sumAdjustments(away);
  const hAdjustment = sumAdjustments(home) + Bonus.HOME_TEAM;

  const aAdjustments = prop('adjustments', away);
  const hAdjustments = prop('adjustments', home);

  const aAdjustmentReasons = formatAdjustmentReasons(aAdjustments);
  const hAdjustmentReasons = `${formatAdjustmentReasons(
    hAdjustments
  )} / HOME_TEAM = 1`;

  return {
    away: {
      adjustment: aAdjustment,
      adjustmentReason: aAdjustmentReasons,
      teamId: away.teamId,
    },
    home: {
      adjustment: hAdjustment,
      adjustmentReason: hAdjustmentReasons,
      teamId: home.teamId,
    },
    id: matchupId,
  };
};

const uiToApi = map(matchupToAdjustment);

const hasValidAdjustments = adjustments =>
  adjustments.some(
    ({ away, home }) => away.adjustment > 0 || home.adjustment > Bonus.HOME_TEAM
  );

export const Adjustment = {
  adjustementToPrint,
  hasValidAdjustments,
  uiToApi,
};
