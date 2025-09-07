import {
  assoc,
  flatten,
  indexBy,
  join,
  map,
  pick,
  pipe,
  prop,
  sum,
  values,
} from 'ramda';
import { columns } from 'utils/google/worksheet';
import { renameKeys } from 'utils/renameKeys';
import { sortByProps } from 'utils/sortByProps';
import { LeagueId } from './leagueId';
import { Owner } from './owner';
import { Position } from './positions';
import { Season } from './season';
import { Team } from './team';

const sumAdjustments = pipe(
  prop('adjustments'),
  map(prop('bonus')),
  sum
);

const adjustmentToPrint = ({ bonus, player, type }) => {
  const { firstName, lastName } = player;

  return `${firstName} ${lastName} ${type} = ${bonus}`;
};

const adjustmentToLog = ({ homeTeamId, players, teamId }) => ({ bonus, player, type }) => {
  const playerMeta = pipe(
    prop(player.id),
    pick([
      'firstName',
      'lastName',
      'id',
      'lineupSlot',
      'lineupSlotId',
      'playerName',
      'position',
      'positionId',
      'proTeamId',
      'proTeamAbbrev',
      'ownerId',
      'ownerAbbrev',
    ])
  )(players);

  return {
    bonus,
    homeTeamId,
    teamId,
    type,
    ...playerMeta,
  };
};

const appendOwnerAbbrev = ownerId =>
  map(
    pipe(
      assoc('ownerId', ownerId),
      assoc('ownerAbbrev', Owner.findAbbrevById(ownerId))
    )
  );

const appendProTeamAbbrev = map(player => {
  const { proTeamId } = player;

  return assoc('proTeamAbbrev', Team.findAbbrevById(proTeamId))(player);
});

const appendPositions = map(player => {
  const { defaultPositionId, lineupSlotId } = player;

  return pipe(
    assoc('lineupSlot', Position.findLineupSlotById(lineupSlotId)),
    assoc('position', Position.findPositionAbbrev(defaultPositionId)),
    assoc('positionId', defaultPositionId)
  )(player);
});

const appendPlayerName = map(p => ({
  ...p,
  playerName: `${p.lastName}, ${p.firstName}`,
}));

const appendMeta = ownerId =>
  pipe(
    appendOwnerAbbrev(ownerId),
    appendProTeamAbbrev,
    appendPositions,
    appendPlayerName
  );

const matchupToAdjustments = matchup => {
  const { away, home } = matchup;

  const {
    adjustments: adjustmentsA,
    players: playersA,
    teamId: teamIdA,
  } = away;

  const {
    adjustments: adjustmentsH,
    players: playersH,
    teamId: teamIdH,
  } = home;

  const players = indexBy(prop('id'), [
    ...appendMeta(teamIdA)(playersA),
    ...appendMeta(teamIdH)(playersH),
  ]);

  return [
    ...map(adjustmentToLog({homeTeamId: teamIdH, players, teamId: teamIdA}), adjustmentsA),
    ...map(adjustmentToLog({homeTeamId: teamIdH, players, teamId: teamIdH}), adjustmentsH),
  ];
};

const matchupsToAdjustments = pipe(
  map(matchupToAdjustments),
  flatten,
  sortByProps(['ownerAbbrev', 'lineupSlot', 'playerName', 'type'])
);

const toHyperlink = (link, text) => `=HYPERLINK("${link}", "${text}")`;

const linkify = weekId => adjustment => {
  const {homeTeamId, id, Player: name, Owner: owner} = adjustment;
  const leagueId = LeagueId.getCurrent();
  const seasonId = Season.current();

  return {
    ...adjustment,
    Owner: toHyperlink(`https://fantasy.espn.com/football/boxscore?leagueId=${leagueId}&matchupPeriodId=${weekId}&scoringPeriodId=${weekId}&seasonId=${seasonId}&teamId=${homeTeamId}&view=scoringperiod`, owner),
    Player: toHyperlink(`https://www.espn.com/nfl/player/gamelog/_/id/${id}`, name),
  }
}

const adjustmentsToGoogle = weekId => map(
  pipe(
    renameKeys({
      bonus: 'Bonus',
      lineupSlot: 'Lineup Slot',
      ownerAbbrev: 'Owner',
      playerName: 'Player',
      position: 'Position',
      proTeamAbbrev: 'Team',
      type: 'Type',
    }),
    linkify(weekId),
    pick(columns),
    values
  )
);

const formatAdjustmentReasons = pipe(
  map(adjustmentToPrint),
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

const hasValidAdjustments = adjustments =>
  adjustments.some(
    ({ away, home }) => away.adjustment > 0 || home.adjustment > 0
  );

const Adjustment = {
  adjustmentToPrint,
  adjustmentsToGoogle,
  hasValidAdjustments,
  matchupsToAdjustments,
  uiToApi,
};

export { Adjustment };
