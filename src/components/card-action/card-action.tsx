import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'materials-card-action',
  styleUrl: 'card-action.scss',
  shadow: true
})
export class CardAction {

  /** The action label. If an icon is provided, it will be render as a title */
  @Prop() label: string;

  /** Use an icon for this action */
  @Prop() icon: string;

  /** Function triggered after this action is pressed */
  @Prop() onAction: Function;

  /** Set true to render this action as a single action button taking up the entire width of the action row
   * Use if you have only one card action
   */
  @Prop() fullBleed: false;

  async componentWillLoad() {
    if (!this.icon && !this.label) {
      console.error('You must define an icon or a label')
      return Promise.reject();
    }
    if (this.icon && !this.label) {
      console.warn('You should define a label in addition to the icon');
    }
  }

  render() {
    return;
  }

}
