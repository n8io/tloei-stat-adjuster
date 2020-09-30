import { pipe, prop, toString, toUpper, __ } from 'ramda';
import espn from '../data/espn';

const { proTeamsMap } = espn.constants;

const findAbbrevById = pipe(
  toString,
  prop(__, proTeamsMap),
  prop('abbrev'),
  toUpper
);

export const Team = {
  findAbbrevById,
};
