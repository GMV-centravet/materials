import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/dist/testing';

describe('datepicker e2e', () => {
  describe('rendering', () => {
    let page: E2EPage;
    let element: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<materials-datepicker></materials-datepicker>`);
      await page.waitForChanges();
      element = await page.find('materials-datepicker');
    });
    it('should render a materials-datepicker', async () => {
      expect(element).toBeTruthy();
    });

    it('should day-current => date du jour', async () => {
      const dayCurrent = await page.find('materials-datepicker >>> .day-current');
      expect(dayCurrent.textContent).toBe((new Date().getDate()).toString());
    });

    xit('should day-selected => greyed background-color', async () => {
      element.setProperty('dateSelected', new Date(2018, 4, 15));
      await page.waitForChanges();
      const daySelected = await page.find('materials-datepicker >>> .day-selected');
      //expect(daySelected).toBeTruthy();
      const style = await daySelected.getComputedStyle()
     expect(style).toBe('')
    //  expect(daySelected.firstChild.textContent).toBe((new Date(2018, 4, 15).getDate()).toString());
  });
    it('should day-current => blue background-color', async () => {
      const date1 = new Date(new Date().setHours(0, 0, 0, 0));
      element.setProperty('dateSelected', date1);
      await page.waitForChanges();

      const dateSelectedProp = await element.getProperty('dateSelected');
      expect(dateSelectedProp).toBe(date1.toISOString());

      const dayCurrent = await page.find('materials-datepicker >>> .day-current');
      // expect(dayCurrent).toBeDefined();
      // const isosstingdate = dayCurrent.getAttribute('data-datepicker');
      // expect(new Date(isosstingdate).getTime()).toBe(date1.getTime());

      // const daySelected = await page.find('materials-datepicker >>> .day-selected');
      // expect(daySelected).toBe('d')
      const f = await dayCurrent.getComputedStyle();
      expect(f.backgroundColor).toBe('rgb(66, 133, 244)');
    });

    it('should emit correct Date on click on day-current', async () => {
      const dateSelectedUpdate = await page.spyOnEvent('dateSelectedUpdate');
      const dayCurrent = await page.find('materials-datepicker >>> .day-current');
      expect(dayCurrent).toBeDefined();
      await dayCurrent.click();
      expect(dateSelectedUpdate).toHaveReceivedEvent();

      const dateR = new Date(dateSelectedUpdate.firstEvent.detail);
      expect(dateR.getDate()).toBe(new Date().getDate());
      expect(dateR.getDay()).toBe(new Date().getDay());
      expect(dateR.getFullYear()).toBe(new Date().getFullYear());
    });

    it('should emit correct Date type [dateSelected]', async () => {
      const dateSelectedUpdateSpy = await page.spyOnEvent('dateSelectedUpdate');
      const anchor = await page.findAll('materials-datepicker >>> .day-overview');
      expect(anchor[0]).toBeDefined();
      await anchor[0].click();
      const { detail } = dateSelectedUpdateSpy.events[0];
      expect(detail).toContain('000Z');

    });
  });
});
