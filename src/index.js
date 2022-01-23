import buildResultSet from './util/clicks-utils';
import clicks from './resources/clicks.json';
import * as fs from 'fs';

const resultSet = buildResultSet(clicks);
fs.writeFileSync('./resultset.json', JSON.stringify(resultSet), { flag:'w+' });

