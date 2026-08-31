import { flatten, propEq } from 'ramda';
import { Bonus } from 'types/bonus';
import { LineupSlot } from 'types/lineupSlots';
import { Player } from 'types/player';
import { Stat } from 'types/stat';

// eslint-disable-next-line new-cap
const lbId = settings => LineupSlot.LB(settings).id;

const AWARDS = [
  { bonus: Bonus.LB_FRTD, stat: Stat.FRTD, type: 'LB_FRTD' },
  { bonus: Bonus.LB_INT, stat: Stat.INT, type: 'LB_INT' },
  { bonus: Bonus.LB_PD, stat: Stat.PD, type: 'LB_PD' },
  { bonus: Bonus.LB_FF, stat: Stat.FF, type: 'LB_FF' },
  { bonus: Bonus.LB_SK, stat: Stat.SK, type: 'LB_SK' },
  { bonus: Bonus.LB_FR, stat: Stat.FR, type: 'LB_FR' },
  { bonus: Bonus.LB_STF, stat: Stat.STF, type: 'LB_STF' },
];

const processPlayer = player => {
  const bonuses = [];

  for (const award of AWARDS) {
    const count = player.stats[award.stat.toString()] || 0;
    const bonus = count * award.bonus;

    bonus &&
      bonuses.push({
        bonus,
        player: Player.apiToUi(player),
        type: award.type,
      });
  }

  return bonuses;
};

export const adjustments = settings => players => {
  // eslint-disable-next-line new-cap
  const isLB = propEq('lineupSlotId', lbId(settings));
  const lbs = players.filter(isLB);

  const bonuses = lbs.map(processPlayer);

  return flatten(bonuses);
};
