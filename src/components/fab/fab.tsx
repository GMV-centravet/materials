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

  @Prop() name: string;
  @Prop() icon: string;
  @Prop() radius: number;

  componentDidLoad() {
    MDCRipple.attachTo(this.host.shadowRoot.querySelector('.mdc-fab'));
  }

  renderIcon() {
    return this.icon ? (<materials-icon name={this.icon} />) : null;
  }

  render() {
    return (
      <button class="mdc-fab">
        <span class="mdc-fab__icon material-icons">{this.renderIcon()}</span>
      </button>
    );
  }
}
