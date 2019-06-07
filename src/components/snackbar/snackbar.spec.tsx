import { TestWindow } from '@stencil/core/testing';

describe('snackbar', () => {
  xit('should build', () => {
    expect(new Snackbar()).toBeTruthy();
  });
});


describe('rendering', () => {

  let window: TestWindow;
  let element;

  beforeEach(async () => {
    window = new TestWindow();
    element = await window.load({
      components: [Snackbar],
      html: '<materials-snackbar></materials-snackbar>'
    });
    await window.flush();
  });

});
