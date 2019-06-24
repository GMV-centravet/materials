import { Component, h, Method, Prop } from '@stencil/core';

/**
 * S'utilise avec des materials-list-item à placer à l'intérieur du tag.
 * <materials-dropdown>
 *   <materials-list-item></materials-list-item>
 * </materials-dropdown>
 */
@Component({
  tag: 'materials-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true
})
export class Dropdown {
  private materialsMenuEl: HTMLMaterialsMenuElement;
  private buttonEl: HTMLMaterialsButtonElement;

  @Prop() menuTitle: string;
  @Prop() menuPosition: 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT' | 'TOP_START' | 'TOP_END' | 'BOTTOM_START' | 'BOTTOM_END';
  @Prop() icon: string;
  @Prop() iconOnly: boolean;
  @Prop() color: string;
  @Prop() buttonType: string;
  @Prop() iconHelper: string;

  componentDidLoad() {
    this.materialsMenuEl.setPosition(this.menuPosition);
    if (this.buttonType) this.buttonEl[this.buttonType] = true;
  }

  componentWillUpdate() {
    if (this.buttonType) this.buttonEl[this.buttonType] = true;
  }

  @Method()
  async openMenu() {
    this.materialsMenuEl.open();
  }

  @Method()
  async closeMenu() {
    this.materialsMenuEl.close();
  }

  @Method()
  async isOpen(): Promise<boolean> {
    return this.materialsMenuEl.isOpen();
  }

  renderIconHelper() {
    return this.iconHelper ? <materials-icon style={{ 'margin-left': '8px', 'margin-right': '-8px' }} name={this.iconHelper} /> : '';
  }
  render() {
    return (
      <div>
        {this.iconOnly &&
          <materials-icon-button
            onClick={() => this.openMenu()}
            icon={this.icon}>
          </materials-icon-button>
        }

        {!this.iconOnly &&
          <materials-button
            color={this.color}
            onClick={() => this.openMenu()}
            icon={this.icon}
            ref={el => this.buttonEl = el}>
            {this.menuTitle}

            {this.renderIconHelper()}
          </materials-button>}
        <materials-menu ref={el => this.materialsMenuEl = el}>
          <slot />
        </materials-menu>
      </div>
    );
  }
}
