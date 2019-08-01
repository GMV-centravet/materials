import { Component, Method } from '@stencil/core';

import { DialogOpts } from './dialog-opts';


@Component({
  tag: 'materials-dialog-controller',
  shadow: true
})
export class MaterialsDialogController {

  /** Create a HTMLMaterialsDialogElement and returns it */
  @Method()
  async create(opts: DialogOpts) {
    const dialog = document.createElement('materials-dialog');
    dialog.dialogTitle = opts.title;
    dialog.actions = opts.actions;
    dialog.body = opts.body;
    dialog.addEventListener('accept', () => dialog.remove());
    dialog.addEventListener('cancel', () => dialog.remove());
    document.body.appendChild(dialog);
    return dialog;
  }
}
