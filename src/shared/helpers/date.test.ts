import { toDateTimeString } from './date';

describe('helpers/date', () => {
  describe('toDateTimeString', () => {
    const cases = [
      ['2011-02-21T19:27:53', '2011-02-21 19:27:53'],
      ['2013-07-21T16:30:00', '2013-07-21 16:30:00'],
    ];

    test.each(cases)('should for %s return %s', (date, expectedValue) => {
      expect(toDateTimeString(date)).toBe(expectedValue);
    });
  });
});
