function filterInputByClickCount(input = [], count = 10) {
    const clickCountMap = input.reduce((acc, curr) => {
        const { ip } = curr;
        return acc[ip] ? ++acc[ip] : acc[ip] = 1, acc
    }, {});
    return input.reduce((acc, element) => {
         const { ip } = element;
         if (clickCountMap[ip] <= count) {
             acc = [...acc, element];
         }
         return acc;
    }, [])
}
function buildResultSet(input = []) {
    if (input.length === 0) {
        throw new Error('Invalid input, clicks array cannot be empty');
    }
    const filteredList = filterInputByClickCount(input);
    return filteredList.reduce((acc, element) => {
        const { ip, timestamp, amount } = element;
        const elementByIp = acc.find(item => item.ip === ip);
        if (!elementByIp) {
            acc = [...acc, elementByIp]
        } else {
           const matchingIndex = acc.indexOf(elementByIp);
           const { amount : matchingElementAmt, timestamp: matchingElementTimeStamp } = elementByIp;        
           if (amount > matchingElementAmt || (amount === matchingElementAmt && timestamp < matchingElementTimeStamp)) {
            acc[matchingIndex] = element;
        }
      }
      return acc; 
   }, []);
}

export { filterInputByClickCount, buildResultSet }