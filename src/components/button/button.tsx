import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'materials-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {

  @Prop() icon: string;
  @Prop() color: 'primary' | 'accent' | 'secondary' | 'error' | string = 'primary';
  @Prop() type: 'button' | 'submit' | 'reset';
  @Prop() disabled = false;
  /**
   * Attention la valeur du border-radius sera toujours en px !
   */
  @Prop() radius: number | string;
  @Prop() raised: boolean;
  @Prop() unelevated: boolean;
  @Prop() outlined: boolean;
  @Prop() dense: boolean;
  @Prop() block: boolean;
  @Element() btnEl: HTMLButtonElement;

  private getClasses() {
    return {
      'mdc-button': true,
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense,
      'mdc-theme--secondary': this.color === 'accent' || this.color === 'secondary',
      'mdc-theme--error': this.color === 'error'

    };
  }

  componentDidLoad() {
    if (this.color && !/(accent)|(primary)|(secondary)|(error)/.test(this.color)) {
      this.btnEl.style.setProperty('--mdc-theme-primary', this.color);
    }
  }

  private getStyle() {
    return {
      // Attention la valeur du border-radius sera toujours en px !
      'border-radius': this.radius ? Number.parseInt(this.radius.toString(), 10) + 'px' : null
    };
  }

  render() {
    return (
      <Host class={{ 'materials-button-block': this.block }}>
        <button
          type={this.type}
          disabled={this.disabled}
          style={this.getStyle()}
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
