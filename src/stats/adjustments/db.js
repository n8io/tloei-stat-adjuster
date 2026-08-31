import { flatten, propEq } from 'ramda';
import { Bonus } from 'types/bonus';
import { LineupSlot } from 'types/lineupSlots';
import { Player } from 'types/player';
import { Stat } from 'types/stat';

// eslint-disable-next-line new-cap
const dbId = settings => LineupSlot.DB(settings).id;

const AWARDS = [
  { bonus: Bonus.DB_INTTD, stat: Stat.INTTD, type: 'DB_INTTD' },
  { bonus: Bonus.DB_INT, stat: Stat.INT, type: 'DB_INT' },
  { bonus: Bonus.DB_PD, stat: Stat.PD, type: 'DB_PD' },
  { bonus: Bonus.DB_FF, stat: Stat.FF, type: 'DB_FF' },
  { bonus: Bonus.DB_SK, stat: Stat.SK, type: 'DB_SK' },
  { bonus: Bonus.DB_BLKK, stat: Stat.BLKK, type: 'DB_BLKK' },
  { bonus: Bonus.DB_TKS, stat: Stat.TKS, type: 'DB_TKS' },
  { bonus: Bonus.DB_FR, stat: Stat.FR, type: 'DB_FR' },
  { bonus: Bonus.DB_STF, stat: Stat.STF, type: 'DB_STF' },
  { bonus: Bonus.DB_TKA, stat: Stat.TKA, type: 'DB_TKA' },
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
  const isDB = propEq('lineupSlotId', dbId(settings));
  const dbs = players.filter(isDB);

  const bonuses = dbs.map(processPlayer);

  return flatten(bonuses);
};
