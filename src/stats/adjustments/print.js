import { Adjustment } from 'types/adjustment';
import { LeagueMember } from 'types/leagueMember';

const adjustmentToString = abbrev => adjustment =>
  `${abbrev}: ${Adjustment.adjustementToPrint(adjustment)}`;

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
  adjustments.length > 0 && console.log(adjustments.join('\n'));
};
