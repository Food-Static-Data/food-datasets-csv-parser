const path = require('path');
// @TODO update require. when we export this method - we can connect it from index.js
const { mainWrapper } = require('../../../../dist/index.cjs');

async function Main() {
  const rawFilePath = path.join(__dirname, `Fish_Reftbl_RefDatasets.csv`);
  mainWrapper(rawFilePath);
  // const result = await mainWrapper(rawFilePath);
}
Main();
