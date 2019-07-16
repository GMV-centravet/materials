import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'materials-card-action',
  styleUrl: 'card-action.scss',
  shadow: true
})
export class CardAction {

  /** The action label. If a icon is provided, it will be render has a title */
  @Prop() label: string;

  /** Use an icon for this action */
  @Prop() icon: string;

  /** Function triggered after this action is pressed */
  @Prop() onAction: Function;

  /** Set true to render this action has a single action button taking up the entire width of the action row
   * Use only if you have only one card action
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
