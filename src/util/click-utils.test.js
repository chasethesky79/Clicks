import { filterInputByRecordCount, buildResultSetPerOneHourPeriod, buildResultSet } from './clicks-utils';

describe('Clicks functionality', () => {
    it('should throw an error if an empty array input is passed in', () => {
          expect(() => buildResultSet([])).toThrow('Invalid input, clicks array cannot be empty');
    });

    it('should filter out more than 10 clicks for an IP', () => {
        const input = [
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 02:02:58", "amount": 7.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 05:02:45", "amount": 11.00 },
            { "ip":"44.44.44.44", "timestamp":"3/11/2020 06:32:42", "amount": 5.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 06:35:12", "amount": 2.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 07:01:53", "amount": 1.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 07:03:15", "amount": 12.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 08:02:22", "amount": 3.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 09:41:50", "amount": 4.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 10:02:54", "amount": 5.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 11:05:35", "amount": 10.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 13:02:21", "amount": 6.00 },
            { "ip":"22.22.22.22", "timestamp":"3/11/2020 16:02:36", "amount": 8.00 }
          ]
          const result = filterInputByRecordCount(input);
          const recordsWithMoreThan10ClicksForAnIp = result.filter(({ ip }) => ip === '22.22.22.22');
          expect(recordsWithMoreThan10ClicksForAnIp.length).toBe(0);
    });

    it('should place the most expensive click in a one hour period in result set', () => {
        const input = [
            { "ip": "11.11.11.11", "timestamp": "3/11/2020 02:12:32", "amount": 6.5 },
            { "ip": "11.11.11.11", "timestamp": "3/11/2020 02:13:11", "amount": 7.25 },
            { "ip": "44.44.44.44", "timestamp": "3/11/2020 02:13:54", "amount": 8.75 },
            { "ip": "44.44.44.44", "timestamp": "3/11/2020 02:15:54", "amount": 18.75 }
          ]
          const result = buildResultSetPerOneHourPeriod(input);
          const { amount: firstAmount } = result.find(({ ip }) => ip === '11.11.11.11');
          expect(firstAmount).toBe(7.25);
          const { amount: secondAmount } = result.find(({ ip }) => ip === '44.44.44.44');
          expect(secondAmount).toBe(18.75);
    });

    it('should place the earliest click into the result set in a one hour period in case of a tie between same IPs with most expensive click ', () => {
        const input = [
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 13:02:40", "amount": 8.00 },
            { "ip":"44.44.44.44", "timestamp":"3/11/2020 13:02:55", "amount": 8.00 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 13:33:34", "amount": 8.00 },
          ]
          const result = buildResultSetPerOneHourPeriod(input);
          const { timestamp } = result.find(({ ip }) => ip === '55.55.55.55');
          expect(timestamp).toBe('3/11/2020 13:02:40');
    });


    it('should return the expected result set for a given input', () => {
        const input = [
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 13:02:40", "amount": 8.00 },
            { "ip":"44.44.44.44", "timestamp":"3/11/2020 13:02:55", "amount": 8.00 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 13:33:34", "amount": 8.00 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 13:42:24", "amount": 8.00 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 13:47:44", "amount": 6.25 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 14:02:54", "amount": 4.25 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 14:03:04", "amount": 5.25 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 15:12:55", "amount": 6.25 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 16:22:11", "amount": 8.50 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 17:18:19", "amount": 11.25 },
            { "ip":"55.55.55.55", "timestamp":"3/11/2020 18:19:20", "amount": 9.00 },
          ]
          const result = filterInputByRecordCount(input);
          const recordsWithMoreThan10ClicksForAnIp = result.filter(({ ip }) => ip === '22.22.22.22');
          expect(recordsWithMoreThan10ClicksForAnIp.length).toBe(0);
    });
});