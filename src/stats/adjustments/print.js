import { LeagueMember } from 'types/leagueMember';

export const adjustementToPrint = ({ bonus, player, type }) => {
  const { firstName, lastName } = player;

  return `${firstName} ${lastName} ${type} = ${bonus}`;
};
const adjustmentToString = abbrev => adjustment =>
  `${abbrev}: ${adjustementToPrint(adjustment)}`;

export const print = ({ matchups, settings }) => {
  const adjustments = matchups.reduce((acc, { away, home }) => {
    const { abbrev: aAbbrev } = LeagueMember.findById({
      id: away.teamId,
      settings,
    });
    const { abbrev: hAbbrev } = LeagueMember.findById({
      id: home.teamId,
      settings,
    });

    return [
      ...acc,
      ...away.adjustments.map(adjustmentToString(aAbbrev)),
      ...home.adjustments.map(adjustmentToString(hAbbrev)),
    ];
  }, []);

  // eslint-disable-next-line no-console
  console.log(adjustments.join('\n'));
};
