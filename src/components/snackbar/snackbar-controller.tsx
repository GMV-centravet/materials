import { Component, Element, Method, State, Watch } from '@stencil/core';

import { SnackBarOptions } from './SnackbarOptions';


@Component({
  tag: 'materials-snackbar-controller',
  shadow: true
})
export class SnackbarController {

  @Element() host: HTMLElement;

  @State() snackQueue: HTMLMaterialsSnackbarElement[] = [];

  private controllerEl: HTMLMaterialsSnackbarControllerElement;

  @Method()
  async create(options: SnackBarOptions) {
    this.controllerEl = document.querySelector('materials-snackbar-controller');
    if (!this.controllerEl) {
      this.controllerEl = document.body.appendChild(document.createElement('materials-snackbar-controller'));
    }
    const snack = document.createElement('materials-snackbar');
    Object.assign(snack, new SnackBarOptions(), options);
    snack.addEventListener('close', (ev) => {
      const closedSnack: HTMLMaterialsSnackbarElement = ev.target as HTMLMaterialsSnackbarElement;
      closedSnack.remove();
      this.controllerEl.sliceQueue();
    });
    this.controllerEl.pushToQueue(snack);
  }

  @Method()
  async pushToQueue(snack: HTMLMaterialsSnackbarElement) {
    this.snackQueue = [...this.snackQueue, snack];
  }
  @Method()
  async sliceQueue() {
    this.snackQueue = this.snackQueue.length > 1 ? [...this.snackQueue.slice(1, this.snackQueue.length)] : []
  }

  @Watch('snackQueue')
  handleQueue(newValue: HTMLMaterialsSnackbarElement[], oldValue: HTMLMaterialsSnackbarElement[]) {
    if (newValue.length > 0 && (oldValue.length > newValue.length || newValue.length === 1)) {
      document.body.appendChild(newValue[0]);
    }
  }
}
