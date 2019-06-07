import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCRipple } from '@material/ripple';
import { Component, Element, h, Prop } from '@stencil/core';

// https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button
// TODO: gerer les couleurs
/**
 * S'utilise avec une icon, img, svg.
 *
 * ## Exemple Utilisation:
 *    <materials-icon-button icon="settings">
 *    <materials-icon-button img="/url/settings">
 *    <materials-icon-button img="data:image/svg+xml;base64,[data]">
 *    <materials-icon-button svg>
 *      <svg slot="svg"></svg>
 *    </materials-icon-button>
 *
 * ### Toggle
 *
 *    <materials-icon-button icon="settings" icon-off="settings_border">
 *
 *    <materials-icon-button img="/url/settings.jpg" img-off="/url/settings_border.jpg">
 *
 *    <materials-icon-button svg>
 *       <svg slot="svg"></svg>
 *       <svg slot="svg-off"></svg>
 *    </materials-icon-button>
 *
 * @deprecated N'utilisez plus la prop "iconOn" mais "icon" à la place
 */
@Component({
  tag: 'materials-icon-button',
  styleUrl: 'icon-button.scss',
  shadow: true,
})

export class IconButton {

  @Element() host: HTMLMaterialsIconButtonElement;
  iconButtonEl;
  iconButtonToggleEl;
  @Prop() disabled: boolean;
  @Prop() pressed: boolean;
  @Prop() icon: string;
  @Prop() iconOn: string;
  @Prop() iconOff: string;
  @Prop() svg: boolean;
  @Prop() svgOff: string;
  @Prop() img: string;
  @Prop() imgOff: string;

  @Prop() label: string;
  @Prop() labelOn: string;
  @Prop() labelOff: string;
  @Prop() large: boolean;
  @Prop() dense = false;

  componentDidLoad() {
    if (this.large) {
      this.iconButtonEl.style.setProperty('--mdc-ripple-fg-size', '43.2px !important');
      this.iconButtonEl.style.setProperty('--mdc-ripple-fg-scale', '1.66667');
      this.iconButtonEl.style.setProperty('--mdc-ripple-fg-scale', '14px');
      this.iconButtonEl.style.setProperty('--mdc-ripple-top', '14px');

    }

    if ((this.icon || this.iconOn) && this.iconOff || this.img && this.imgOff || this.svg && this.svgOff) {
      MDCIconButtonToggle.attachTo(this.iconButtonToggleEl);
    } else if (this.icon || this.img || this.svg) {
      const iconButtonRipple = MDCRipple.attachTo(this.iconButtonEl);
      iconButtonRipple.unbounded = true;
    }
    this.initSvg();

  }
  /**
   * Set la width et height à 24;
   * Et ajoute les classes MDC aux elements svg inséré dans les slot svg & svg-off.
   */
  initSvg() {
    if (this.svg || this.svg && this.svgOff) {
      const svgOnEl = document.querySelector('svg[slot="svg"]');
      const svgOffEl = document.querySelector('svg[slot="svg-off"]');
      svgOnEl.classList.add('mdc-icon-button__icon', 'mdc-icon-button__icon--on');
      svgOnEl.setAttribute('width', '24');
      svgOnEl.setAttribute('height', '24');

      if (svgOffEl) {
        svgOffEl.classList.add('mdc-icon-button__icon');
        svgOffEl.setAttribute('width', '24');
        svgOffEl.setAttribute('height', '24');
      }
    }
  }
  renderIconButtonToggle() {
    return (
      <button
        class={this.setClassIconButtonToggle()}
        aria-label={this.label}
        aria-hidden={this.pressed}
        aria-pressed={this.pressed}
        disabled={this.disabled}
        ref={el => this.iconButtonToggleEl = el}>
        {(this.iconOn || this.icon) && this.iconOff && this.iconToggle()}
        {this.svg && (document.querySelector('svg[slot="svg-off"]')) && this.svgToggle()}
        {this.img && this.imgOff && this.imgToggle()}

      </button>
    );
  }

  iconToggle = () => ([
    <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">
      {this.iconOn || this.icon}
    </i>,
    <i class="material-icons mdc-icon-button__icon">
      {this.iconOff}
    </i>
  ])

  svgToggle = () => ([
    <slot name="svg-off" />,
    <slot name="svg" />
  ])

  imgToggle = () => ([
    <img src={this.imgOff} class="mdc-icon-button__icon" />,
    <img src={this.img} class="mdc-icon-button__icon mdc-icon-button__icon--on" />
  ])

  renderIconButton() {
    return (
      <button
        class={{ 'mdc-icon-button': true, 'materials-dense': this.dense }}
        ref={el => this.iconButtonEl = el}
        disabled={this.disabled}>
        {this.icon && <i class={this.getIconClasses()}>{this.icon}</i>}

        {this.img && <img src={this.img} class="mdc-icon-button__icon " />}

        {this.svg && <slot name="svg" />}
      </button>
    );
  }
  getIconClasses() {
    const classes = {
      'mdc-icon-button__icon': true,
      'material-icons': true,
    };
    return classes;
  }

  setClassIconButtonToggle() {
    return {
      'mdc-icon-button': true,
      'mdc-icon-button--on': !this.icon // n'est pas utilisé si on utilise les icones v0.44.0
    };
  }

  render() {
    return (
      this.iconOn || this.icon && this.iconOff
      ||
      this.img && this.imgOff
      ||
      this.svg && this.svgOff
    ) ? this.renderIconButtonToggle() : this.renderIconButton();
  }
}
