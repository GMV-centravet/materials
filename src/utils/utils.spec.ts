import { yyyymmdd } from './utils';

describe('Unit Test Utils', () => {
  it('should return correct yyyy-mm-dd format', () => {
    const date1 = new Date(2018, 11, 1);
    expect(yyyymmdd(date1)).toBe('2018-12-01');
  });
});
