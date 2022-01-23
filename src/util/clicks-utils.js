import moment from 'moment';

function filterClicksByRecordCount(input = [], count = 10) {
    const clickCountMap = input.reduce((acc, curr) => {
        const { ip } = curr;
        return acc[ip] ? ++acc[ip] : acc[ip] = 1, acc
    }, {});
    return input.filter(({ ip }) => clickCountMap[ip] <= count);
}
function buildResultSet(input = []) {
    if (input.length === 0) {
        throw new Error('Invalid input, clicks array cannot be empty');
    }
    const timeStampFormat = 'MM/DD/YYYY HH:mm:ss';
    const filteredList = filterClicksByRecordCount(input);
    return filteredList.reduce((acc, element) => {
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

export default buildResultSet;