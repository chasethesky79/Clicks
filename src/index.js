import { buildResultSet, filterInputByClickCount } from './util/clicks-utils';
import clicks from './resources/clicks.json';

const filteredList = filterInputByClickCount(clicks);
console.log(`CLICKS counts original list and filtered list ${clicks.length}, ${filteredList.length}`);
