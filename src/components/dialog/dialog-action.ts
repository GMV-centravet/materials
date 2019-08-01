/**
 * This class represents a dialog action (eg. an action button)
 *
 */
export class DialogAction {
  /** The action button label */
  label!: string;
  /**
   * The role of this action:
   * - accept: a confirmation action (close the dialog which emit an 'accept' Event)
   * - close: a dismiss action (close the dialog which emit a 'cancel' Event)
   * - no-close: an action not closing the dialog
   */
  role!: 'accept' | 'close' | 'no-close';
  /** A function executed when this action get pressed */
  action?: Function;
  /** An html title help for this action */
  title?: string;
}
