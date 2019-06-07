import { TestWindow } from '@stencil/core/testing';
import { DrawerListItem } from './drawer-list-item';

describe('drawer-list-item', () => {
  it('should build', () => {
    expect(new DrawerListItem()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLDrawerListItemElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [DrawerListItem],
        html: '<drawer-list-item></drawer-list-item>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
