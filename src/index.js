import { buildResultSet, filterInputByClickCount } from './util/clicks-utils';
import clicks from './resources/clicks.json';

const filteredList = buildResultSet(clicks);
console.log(`CLICKS counts original list and filtered list ${JSON.stringify(filteredList)}, ${filteredList.length}`);

