import { SnackbarController } from './snackbar-controller';

describe('snackbar-controller', () => {
  it('should build', () => {
    expect(new SnackbarController()).toBeTruthy();


  });

  xit('should return snackbar element', async () => {
    const snackbarCtl = new SnackbarController();
    snackbarCtl.create({ label: 'hello world' });
  });

});
