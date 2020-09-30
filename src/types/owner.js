import { indexBy, pipe, prop, toString, toUpper, __ } from 'ramda';
import league from '../data/league';

const { teams: tempTeams } = league;

const teams = indexBy(prop("id"), tempTeams);

const findAbbrevById = pipe(
  toString,
  prop(__, teams),
  prop('abbrev'),
  toUpper
);

export const Owner = {
  findAbbrevById,
};
