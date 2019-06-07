import { Component, h, Method, Prop } from '@stencil/core';


@Component({
  tag: 'materials-drawer-list-item',
  styleUrl: 'drawer-list-item.css'
})
export class DrawerListItem {

  @Prop() label: string;
  @Prop() activated: boolean;
  @Prop() icon: string;
  @Prop() targetUrl: string;

  private getClasses() {
    return {
      'mdc-list-item': true,
      'mdc-list-item--activated': this.activated
    }
  }

  @Method()
  async renderHtml() {
    return Promise.resolve(
      <a class={this.getClasses()} href={this.targetUrl} aria-current="page">
        {this.icon && <i class="material-icons mdc-list-item__graphic" aria-hidden="true">{this.icon}</i>}
        <span class="mdc-list-item__text">{this.label}</span>
      </a>
    );
  }

  render() {
    return;
  }
}
