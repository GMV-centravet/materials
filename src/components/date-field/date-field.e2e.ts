import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/dist/testing';

describe('date-field e2e', () => {

  describe('rendering', () => {

    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<materials-date-field></materials-date-field>');
      await page.waitForChanges();

      element = await page.find('materials-date-field');
    });


    it('should render a datepicker when click on date-field with datepicker', async () => {
      element.setProperty('datepicker', true);
      element.setProperty('value', new Date(2019, 1, 1));
      await page.waitForChanges();
      await element.click();
      await page.waitForChanges();

      const datepicker = await page.find('materials-date-field >>> materials-datepicker');
      expect(datepicker).toBeTruthy();
      // expect((await datepicker.getProperty('dateSelected'))).toEqual({})
    });

    it('should render a timepicker when click on date-field with timepicker', async () => {
      element.setProperty('timepicker', true);
      element.setProperty('value', '11:00');
      await page.waitForChanges();
      await element.click();
      await page.waitForChanges();

      const timepicker = await page.find('materials-date-field >>> materials-timepicker');
      expect(timepicker).toBeTruthy();
      expect((await timepicker.getProperty('timeSelected'))).toEqual('11:00');
    });


  });
});
