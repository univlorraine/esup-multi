const fs = require('fs');
const packageData = require('./package.json');

const info = {
  version : packageData.version,
};

const infoJson = JSON.stringify(info, null, 2);
fs.writeFileSync('projects/shared/src/lib/infos/infos.json', infoJson);
