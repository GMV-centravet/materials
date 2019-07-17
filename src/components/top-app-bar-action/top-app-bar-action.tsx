import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'materials-top-app-bar-action',
  styleUrl: 'top-app-bar-action.scss',
  shadow: true
})
export class TopAppBarAction {

  @Prop() label: string;
  @Prop() actionTitle: string;
  @Prop() icon?: string;

  render() {
    return;
  }

}
