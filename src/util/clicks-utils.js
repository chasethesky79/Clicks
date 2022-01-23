import moment from 'moment';

const timeStampFormat = 'MM/DD/YYYY HH:mm:ss';
function filterInputByRecordCount(input, count = 10) {
    const clickCountMap = input.reduce((acc, curr) => {
        const { ip } = curr;
        return acc[ip] ? ++acc[ip] : acc[ip] = 1, acc
    }, {});
    return input.filter(({ ip }) => clickCountMap[ip] <= count);
}
function buildResultSetPerOneHourPeriod(input = []) {
    return input.reduce((acc, element) => {
        const { ip, timestamp, amount } = element;
        const timeStampCurrVal = moment(timestamp, timeStampFormat);
        const elementByIp = acc.find(item => item.ip === ip);
        if (!elementByIp) {
            acc = [...acc, element]
        } else {
           const matchingIndex = acc.indexOf(elementByIp);
           const { amount : matchingElementAmt, timestamp: matchingElementTimeStamp } = elementByIp;
           const matchingElementTimeStampVal = moment(matchingElementTimeStamp, timeStampFormat);        
           if (amount > matchingElementAmt || (amount === matchingElementAmt && timeStampCurrVal < matchingElementTimeStampVal)) {
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
    let startOfTheHour = getStartOfTheHour(input[0]);
    let endOfTheHour;
    let clicksRecordsForOneHourPeriod = [];
    let resultSet = [];
    const filteredList = filterInputByRecordCount(input);
    filteredList.forEach((element, index) => {
       const { timestamp, ip } = element;
       const current = moment(timestamp, timeStampFormat);
       endOfTheHour = endOfTheHour || moment(startOfTheHour).add(1, 'hours').subtract(1, 'second');
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

function getStartOfTheHour(element) {
    const { timestamp } = element;
    const time = moment(timestamp, timeStampFormat);
    return time.startOf('hour');
}

export default buildResultSet;
