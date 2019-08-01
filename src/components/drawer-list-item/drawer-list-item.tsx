import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';

@Component({
  tag: 'materials-drawer-list-item',
  styleUrl: 'drawer-list-item.css',
  shadow: true

})
export class DrawerListItem {

  /** The drawer item label */
  @Prop() label!: string;

  /** Mark this drawer item as activated */
  @Prop() activated: boolean;

  /** Render an icon (from material-icons library) */
  @Prop() icon: string;

  /** render with a href="${targetUrl}"*/
  @Prop() targetUrl: string;

  /** Emitted when it get pressed */
  @Event({ eventName: 'press' }) pressEvent: EventEmitter;


  /** Trigger a press event */
  @Method()
  async press(e) {
    this.pressEvent.emit(e);
  }

  render() {
    return;
  }
}
