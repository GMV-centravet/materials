import { Component, Method } from '@stencil/core';

import { AlertOpts } from './alert-opts';


@Component({
  tag: 'materials-alert-controller',
  shadow: true
})
export class MaterialsAlertController {

  /** Create a HTMLMaterialsDialogElement and returns it */
  @Method()
  async create(opts: AlertOpts) {
    const dialog = document.createElement('materials-dialog');
    dialog.dialogTitle = opts.title;
    dialog.actions = [];
    if (opts.cancelText) {
      dialog.actions.push({
        label: opts.cancelText,
        role: 'close',
        action: opts.onCancel
      })
    }

    dialog.actions.push({
      label: opts.acceptText,
      role: 'accept',
      action: opts.onAccept
    });
    dialog.body = opts.message;
    dialog.addEventListener('accept', () => dialog.remove());
    dialog.addEventListener('cancel', () => dialog.remove());
    document.body.appendChild(dialog);
    return dialog;
  }
}
