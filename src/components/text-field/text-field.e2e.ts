import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/dist/testing';

describe('text-field e2e', () => {

  describe('rendering', () => {

    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<materials-text-field></materials-text-field>');
      await page.waitForChanges();

      element = await page.find('materials-text-field');
    });
  });
});
