import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';

@Component({
  tag: 'materials-drawer-list-item',
  styleUrl: 'drawer-list-item.css'
})
export class DrawerListItem {

  @Prop() label: string;
  @Prop() activated: boolean;
  @Prop() icon: string;
  @Prop() targetUrl: string;

  @Event({ eventName: 'press' }) pressEvent: EventEmitter;


  @Method()
  async press(e) {
    this.pressEvent.emit(e);
  }

  render() {
    return;
  }
}
