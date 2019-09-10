import { join, map, pipe, prop, sum } from 'ramda';
import { adjustementToPrint } from 'stats/adjustments/print';

const sumAdjustments = pipe(
  prop('adjustments'),
  map(prop('bonus')),
  sum
);

const formatAdjustmentReasons = pipe(
  map(adjustementToPrint),
  join(' / ')
);

const matchupToAdjustment = ({ away, home, id: matchupId }) => {
  const aAdjustment = sumAdjustments(away);
  const hAdjustment = sumAdjustments(home);

  const aAdjustments = prop('adjustments', away);
  const hAdjustments = prop('adjustments', home);

  const aAdjustmentReasons = formatAdjustmentReasons(aAdjustments);
  const hAdjustmentReasons = formatAdjustmentReasons(hAdjustments);

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

export const Adjustment = {
  uiToApi,
};
