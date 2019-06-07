import { newE2EPage } from '@stencil/core/testing';



describe('materials-checkbox', () => {
  it('should render a checkbox with correct label ', async () => {
    const page = await newE2EPage();
    const label = 'My Checkbox Label';
    await page.setContent(`<materials-checkbox></materials-checkbox>`);
    const mwcCheckboxEl = await page.find('materials-checkbox');
    mwcCheckboxEl.setProperty('label', label);
    await page.waitForChanges();
    const el = await page.find('materials-checkbox >>> label');
    expect(el.textContent).toEqual(label);
  });
});
