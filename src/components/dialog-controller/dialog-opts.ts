import { DialogAction } from '../dialog/dialog-action';

export class DialogOpts {

  /** The dialog title */
  title?: string;
  /** The dialog body, it can be an HTMLElement or plain text */
  body!: string | HTMLElement;
  /** An array of actions for this dialog */
  actions: DialogAction[];
  /** Fix the width of the dialog */
  width?: string;
  /** Fix the height of the dialog */
  height?: string;
  /** Render a Close Button in the dialog header */
  closeButton?: boolean;
}
