import { both, either, flatten, propEq } from 'ramda';
import { Bonus } from 'types/bonus';
import { LineupSlot } from 'types/lineupSlots';
import { Player } from 'types/player';
import { Position } from 'types/positions';
import { Stat } from 'types/stat';

/* eslint-disable new-cap */
const flexId = settings => LineupSlot.FLEX(settings).id;
const teId = settings => LineupSlot.TE(settings).id;
const tePositionId = ({ espn }) => Position.TE(espn).id;
/* eslint-enable new-cap */

const processPlayer = player => {
  const bonuses = [];
  const receptions = player.stats[Stat.REC.toString()] || 0;
  const receivingYards = player.stats[Stat.REC_YDS.toString()] || 0;

  const receptionBonus = receptions * Bonus.TE_REC;

  receptionBonus &&
    bonuses.push({
      bonus: receptionBonus,
      player: Player.apiToUi(player),
      type: 'TE_REC',
    });

  const receivingYardsBonus = receivingYards * Bonus.TE_REC_YDS;

  receivingYardsBonus &&
    bonuses.push({
      bonus: receivingYardsBonus,
      player: Player.apiToUi(player),
      type: 'TE_REC_YDS',
    });

  return bonuses;
};

// eslint-disable-next-line complexity, max-statements
export const adjustments = settings => players => {
  // eslint-disable-next-line new-cap
  const isTeSlot = propEq('lineupSlotId', teId(settings));
  const isFlexSlot = propEq('lineupSlotId', flexId(settings));
  const isTePosition = propEq('defaultPositionId', tePositionId(settings));
  const isFlexTe = both(isFlexSlot, isTePosition);
  const isTe = either(isTeSlot, isFlexTe);

  const tes = players.filter(isTe);

  const bonuses = tes.map(processPlayer);

  return flatten(bonuses);
};
