import { Component, Element, h, Host, Prop } from '@stencil/core';

/**
 * A Material Design button component.
 *
 * To render a clear Material button on any html page :
 * @example
 * <materials-button>Click me</materials-button>
 *
 * @description
 * You can use any icon from the material-icons collection (https://material.io/tools/icons)
 *
 * Code is available on github: https://github.com/GMV-centravet/materials/tree/master/src/components/button
 *
 * Material Design guidelines: https://material.io/design/components/buttons.html
 */
@Component({
  tag: 'materials-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {

  /** The button color, it can be either :
   *  - a predifined value : 'primary', 'secondary', 'error'.
   *  - an hexa color code : #225566, #CCC.
   *  - a css named color : red, blue.
   */
  @Prop() color: 'primary' | 'secondary' | 'error' | string = 'primary';

  /** A material icon name */
  @Prop() icon?: string = '';

  /** The button type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Disable the button */
  @Prop() disabled = false;

  /** Render a raised Material button */
  @Prop() raised: boolean = false;

  /** Render an unelevated Material button */
  @Prop() unelevated: boolean = false;

  /** Render an outlined Material button */
  @Prop() outlined: boolean = false;

  /** Render a dense Material button () */
  @Prop() dense: boolean = false;

  /** Render a block Material button (Full width) */
  @Prop() block: boolean = false;

  @Element() private btnEl: HTMLButtonElement;

  private getClasses() {
    return {
      'mdc-button': true,
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense,
      'mdc-theme--secondary': this.color === 'secondary',
      'mdc-theme--error': this.color === 'error'

    };
  }

  componentDidLoad() {
    if (this.color && !/(primary)|(secondary)|(error)/.test(this.color)) {
      this.btnEl.style.setProperty('--mdc-theme-primary', this.color);
    }
  }

  render() {
    return (
      <Host class={{ 'materials-button-block': this.block }}>
        <button
          type={this.type}
          disabled={this.disabled}
          class={this.getClasses()}
        >
          {this.icon &&
            <i class="material-icons mdc-button__icon" aria-hidden="true">{this.icon}</i>
          }
          <span class="mdc-button__label">
            <slot />
          </span>
        </button>
      </Host>
    );
  }
}
