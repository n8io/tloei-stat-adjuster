import { find, indexBy, path, pipe, prop, propEq, toString, __ } from 'ramda';
import espn from '../data/espn';

const { lineupSlotsMap, positions: tempPositions } = espn.constants;
const positionsMap = indexBy(prop('id'), tempPositions);

const findPositionAbbrev = pipe(
  toString,
  prop(__, positionsMap),
  prop('abbrev')
);

const findLineupSlotById = pipe(
  toString,
  prop(__, lineupSlotsMap),
  prop('abbrev')
);

const findPositionByAbbrev = ({ espnSettings, position }) => {
  const positions = path(['constants', 'positions'], espnSettings);

  return find(propEq('abbrev', position), positions);
};

const findPositionById = ({ espnSettings, id }) => {
  const positions = path(['positions'], espnSettings);

  return find(propEq('id', id), positions);
};

const QB = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'QB' });

const RB = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'RB' });

const WR = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'WR' });

const TE = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'TE' });

const LB = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'LB' });

const DL = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'DL' });

const DB = espnSettings =>
  findPositionByAbbrev({ espnSettings, position: 'DB' });

const K = espnSettings => findPositionByAbbrev({ espnSettings, position: 'K' });

const P = espnSettings => findPositionByAbbrev({ espnSettings, position: 'P' });

export const Position = {
  DB,
  DL,
  K,
  LB,
  P,
  QB,
  RB,
  TE,
  WR,
  findLineupSlotById,
  findPositionAbbrev,
  findPositionByAbbrev,
  findPositionById,
};
