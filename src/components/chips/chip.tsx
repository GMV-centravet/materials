import { Component, Element, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-chip',
  styleUrl: 'chip.scss',
  shadow: true
})
export class Chip {

  /** The chip background color, it can be either :
   *  - a predifined value : 'primary', 'secondary'.
   *  - an hexa color code : #225566, #CCC.
   *  - a css named color : red, blue.
   */
  @Prop() color: 'primary' | 'secondary' | string = 'primary';

  /** The chip text color, it can be either :
   *  - a predifined value : 'primary', 'secondary'.
   *  - an hexa color code : #225566, #CCC.
   *  - a css named color : red, blue.
   */
  @Prop() inkColor: 'primary' | 'secondary' | string = 'primary';

  @Element() host: HTMLElement;

  componentDidLoad() {
    if (this.color && !/(primary)|(secondary)/.test(this.color)) {
      this.host.style.setProperty('--mdc-theme-primary', this.color);
    }
    if (this.inkColor && !/(primary)|(secondary)/.test(this.inkColor)) {
      this.host.style.setProperty('--mdc-theme-on-primary', this.inkColor);
    }
  }

  private getClasses() {
    return {
      'mdc-chip': true,
      'mdc-chip--colored': !!this.color,
      'mdc-chip--ink-colored': !!this.inkColor,
      'mdc-theme--secondary': this.color === 'secondary'
    };
  }

  render() {
    return (
      <Host class="mdc-chip-set">
        <div class={this.getClasses()} tabindex="0">
          <div class="mdc-chip__text">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
