import { log } from 'utils/log';

const columns = [
  'Owner',
  'Player',
  'Lineup Slot',
  'Position',
  'Team',
  'Type',
  'Bonus',
];

const createSheet = async (doc, name) => {
  log(`✨ Creating new sheet named: ${name}...`);

  const sheet = await doc.addSheet({
    headerValues: columns,
    title: name,
  });

  log(`👍 Created new ${name} sheet.`);

  return sheet;
};

const getSheet = async (doc, name) => {
  log(`🔍 Finding ${name} sheet in workbook...`);
  let sheet = await doc.sheetsByTitle[name];

  if (sheet) {
    log(`👍 Found ${name} sheet.`);
  } else {
    log(`🤷‍♂️ Could not find ${name} sheet in workbook...`);
    sheet = await createSheet(doc, name);
  }

  return sheet;
};

const reset = async sheet => {
  await sheet.resize({
    columnCount: columns.length,
    rowCount: 1,
  });

  await sheet.resize({
    columnCount: columns.length,
    rowCount: 2,
  });
};

export { columns, getSheet, reset };
