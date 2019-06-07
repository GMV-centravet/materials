import { MDCSwitch } from '@material/switch';
import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-switch',
  styleUrl: 'switch.scss',
  shadow: true
})

export class Switch {

  @Element() host: HTMLElement;
  @Event() change: EventEmitter;

  @Prop() disabled: boolean;
  @Prop() label: string;
  @Prop({ mutable: true, reflectToAttr: true }) checked: boolean;

  private switch: MDCSwitch;

  componentDidLoad() {
    this.switch = new MDCSwitch(this.host.shadowRoot.querySelector('.mdc-switch'));
  }

  switchUpdate() {
    this.checked = this.switch.checked;
    this.change.emit(this.checked);
  }

  render() {
    return (
      [
        <div class={{ 'mdc-switch': true, 'mdc-switch--disabled': this.disabled, 'mdc-switch--checked': this.checked }}>
          <div class="mdc-switch__track"></div>
          <div class="mdc-switch__thumb-underlay">
            <div class="mdc-switch__thumb">
              <input disabled={this.disabled} checked={this.checked} type="checkbox" id="switch-id" class="mdc-switch__native-control" role="switch" onChange={() => this.switchUpdate()} />
            </div>
          </div>
        </div>,
        <label class="mdc-typography" htmlFor="switch-id">{this.label}</label>
      ]

    );
  }
}
