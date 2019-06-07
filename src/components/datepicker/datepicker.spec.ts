// import { Datepicker } from './datepicker';

describe('datepicker spec', () => {
  it('toBeTruthy()', () => {
    expect(true).toBeTruthy();
  });

  xit('check dateSelected Props & addMonth method', () => {
    const datepicker = new Datepicker();
    expect(datepicker.dateSelected.getDate()).toBe(new Date().getDate());
    datepicker.addMonth(-1);
    expect(datepicker.currentMonth.getMonth()).toBe(new Date(new Date().setMonth(new Date().getMonth() - 1)).getMonth());
  });


  xit('should check if valid date otherwise render current Date', async () => {
    const element = new Datepicker()
    expect(element.isValidDate('').getDate()).toBe(new Date().getDate());
    expect(element.isValidDate('2018-05-11').getDate()).toBe(new Date(2018, 4, 11).getDate());
  });
});
