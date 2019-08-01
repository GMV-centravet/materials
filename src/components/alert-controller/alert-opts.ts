
export class AlertOpts {

  /** The dialog title */
  title?: string;
  /** The dialog body, it can be an HTMLElement or plain text */
  message!: string;
  /** The accept button text */
  acceptText!: string;
  /** The cancel button text */
  cancelText?: string;
  /** Triggered when accept button get pressed*/
  onAccept?: Function;
  /** Triggered when cancel button get pressed*/
  onCancel?: Function;

}
