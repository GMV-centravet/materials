import { MDCRipple } from '@material/ripple';
import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-fab',
  styleUrl: 'fab.scss',
  shadow: true,
})

export class Fab {

  @Element()
  private host: HTMLMaterialsFabElement;

  /** Optionnal, an icon name from the material icons set*/
  @Prop() icon: string;

  /**
   * Optionnal, a text label
   *
   * If provided, it will render as an extended FAB
   */
  @Prop() label: string;

  /**
   * Optional, specifies the FAB size
   */
  @Prop() size: 'medium' | 'small' = 'medium';

  /**
   * Optional, animates the FAB out of view.
   *
   * When set to false, the FAB will return to view.
   */
  @Prop() hidden = false;

  componentWillLoad() {
    if (!this.icon && !this.label) {
      throw '[materials][FAB] You should define at least a label or an icon';
    }
  }

  componentDidLoad() {
    MDCRipple.attachTo(this.host.shadowRoot.querySelector('.mdc-fab'));
  }

  renderIcon() {
    return this.icon ? (<materials-icon name={this.icon} />) : null;
  }

  render() {
    return (
      <button class={{ 'mdc-fab': true, 'mdc-fab--extended': !!this.label, 'mdc-fab--mini': this.size === 'small', 'mdc-fab--exited': this.hidden }}>
        {this.icon && <span class="mdc-fab__icon material-icons">{this.renderIcon()}</span>}
        {this.label && <span class="mdc-fab__label">{this.label}</span>}
      </button>
    );
  }
}
