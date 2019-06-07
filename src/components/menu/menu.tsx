import { Corner, MDCMenu } from '@material/menu';
import { Component, Element, h, Method, Prop } from '@stencil/core';

import { AnchorMargin } from './anchor-margin';

@Component({
  tag: 'materials-menu',
  styleUrl: 'menu.scss',
  shadow: true
})
export class Menu {
  private menuEl: HTMLDivElement;
  private mdcMenuEl: MDCMenu;

  @Element() host: HTMLElement;

  /**
   * Override default CSS mdc-list padding-top & bottom.
   */
  @Prop() noPadding: boolean;

  componentDidLoad() {
    this.mdcMenuEl = new MDCMenu(this.menuEl);
  }

  @Method()
  async setPosition(position: 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT' | 'TOP_START' | 'TOP_END' | 'BOTTOM_START' | 'BOTTOM_END') {
    this.mdcMenuEl.setAnchorCorner(Corner[position]);
  }

  @Method()
  async setAnchorMargin(margin: AnchorMargin) {
    this.mdcMenuEl.setAnchorMargin(margin);
  }

  @Method()
  async isOpen(): Promise<boolean> {
    return Promise.resolve(this.mdcMenuEl.open);
  }

  @Method()
  async open() {
    this.mdcMenuEl.open = true;
  }

  @Method()
  async close() {
    this.mdcMenuEl.open = false;
  }

  render() {
    return (
      <div class="mdc-menu-surface--anchor">
        <div class="mdc-menu mdc-menu-surface" ref={el => { this.menuEl = el; }}>
          <ul class={{ 'mdc-list': true, 'no-padding': this.noPadding }} role="menu" aria-hidden="true" aria-orientation="vertical">
            <slot />
          </ul>
        </div>
      </div>
    );
  }
}
