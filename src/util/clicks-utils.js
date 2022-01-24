import moment from 'moment';

const timeStampFormat = 'MM/DD/YYYY HH:mm:ss';
function filterInputByRecordCount(input, count = 10) {
    // Build a map of IP vs count of IP
    const clickCountMap = input.reduce((acc, curr) => {
        const { ip } = curr;
        return acc[ip] ? ++acc[ip] : acc[ip] = 1, acc
    }, {});
    return input.filter(({ ip }) => clickCountMap[ip] <= count);
}

function buildResultSetPerOneHourPeriod(input = []) {
    // Apply given business rules to determine which record goes into the result set built for a 1 hour period
    return input.reduce((acc, element) => {
        const { ip, amount } = element;
        const elementByIp = acc.find(item => item.ip === ip);
        if (!elementByIp) {
            acc = [...acc, element]
        } else {
           const matchingIndex = acc.indexOf(elementByIp);
           const { amount : matchingElementAmt } = elementByIp;     
           if (amount > matchingElementAmt) {
            acc[matchingIndex] = element;
        }
      }
      return acc; 
   }, []);
}

function buildResultSet(input = []) {
    if (input.length === 0) {
        throw new Error('Invalid input, clicks array cannot be empty');
    }
    // sort input in ascending order of timestamps
    input = input.sort((date1, date2) => moment(date1.timestamp, timeStampFormat).diff(moment(date2.timestamp, timeStampFormat))); 
    let startOfTheHour = getStartOfTheHour(input[0]);
    let endOfTheHour;
    let clicksRecordsForOneHourPeriod = [];
    let resultSet = [];
    const filteredList = filterInputByRecordCount(input);
    filteredList.forEach((element, index) => {
       const { timestamp } = element;
       const current = moment(timestamp, timeStampFormat);
       endOfTheHour = endOfTheHour || moment(startOfTheHour).add(1, 'hours').subtract(1, 'second');
       // Incrementally build records for every hour period and add them to the final result set and flatten that array to get a flattened result set
       if (current.isSameOrAfter(startOfTheHour) && current.isSameOrBefore(endOfTheHour)) {
           clicksRecordsForOneHourPeriod = [...clicksRecordsForOneHourPeriod, element];
       } else {
           let resultSetForOneHourPeriod = buildResultSetPerOneHourPeriod(clicksRecordsForOneHourPeriod);
           resultSet = [...resultSet, resultSetForOneHourPeriod];
           startOfTheHour = getStartOfTheHour(element);
           endOfTheHour = moment(startOfTheHour).add(1, 'hours').subtract(1, 'second');
           clicksRecordsForOneHourPeriod = [element];
           if (index === filteredList.length - 1) {
                resultSet = [...resultSet, element];
           }
       }  
    })
    return resultSet.flat();
}

// Calculate start of the hour for every 1 hour period
function getStartOfTheHour(element) {
    const { timestamp } = element;
    const time = moment(timestamp, timeStampFormat);
    return time.startOf('hour');
}

export { filterInputByRecordCount, buildResultSetPerOneHourPeriod, buildResultSet }
