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
    let startTime;
    let clicksRecordsForOneHourPeriod = [];
    let resultSet = [];
    const filteredList = filterInputByRecordCount(input);
    filteredList.forEach(element => {
       const { timestamp } = element;
       if (!startTime) {
           startTime = moment(timestamp, timeStampFormat); 
           clicksRecordsForOneHourPeriod = [...clicksRecordsForOneHourPeriod, element];
           return;
       }
       const currentTime = moment(timestamp, timeStampFormat);
       const durationInHours = moment.duration(currentTime.diff(startTime)).asHours();
       if (durationInHours <= 1) {
           clicksRecordsForOneHourPeriod = [...clicksRecordsForOneHourPeriod, element];
       } else {
           const resultSetForOneHourPeriod = buildResultSetPerOneHourPeriod(clicksRecordsForOneHourPeriod);
           resultSet = [...resultSet, resultSetForOneHourPeriod];
           startTime = null;
           clicksRecordsForOneHourPeriod = [];
       }  
    })
    return resultSet;
}

export default buildResultSet;