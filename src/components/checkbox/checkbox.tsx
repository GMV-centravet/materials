import { MDCCheckbox } from '@material/checkbox';
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';


@Component({
  tag: 'materials-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true
})
export class Checkbox {
  @Prop() disabled = false;
  @Prop() color: 'primary' | 'accent' | 'secondary' | 'danger' | string = 'accent';
  @Prop() name: string;
  @Prop({ reflectToAttr: true, mutable: true }) value: string | number;
  @Prop({ reflectToAttr: true, mutable: true }) checked = false;
  @Prop() indeterminate = false;
  @Prop() label: string;
  @Prop() alignLabel = 'left';
  @Event() change: EventEmitter;
  mdcCheckbox: MDCCheckbox;
  checkboxDiv: HTMLElement;


  componentDidLoad() {
    this.mdcCheckbox = new MDCCheckbox(this.checkboxDiv);
    if (this.indeterminate) {
      this.mdcCheckbox.indeterminate = this.indeterminate;
    }
    if (this.color && !/(accent)|(primary)|(secondary)|(error)/.test(this.color)) {
      this.checkboxDiv.style.setProperty('--mdc-theme-secondary', this.color);
    }
  }



  componentDidUnload() {
    this.mdcCheckbox.destroy();
  }

  getCheckboxClasses() {
    return {
      'mdc-checkbox': true,
      'mdc-theme--primary': this.color === 'primary',
      'mdc-theme--error': this.color === 'error',
    };
  }

  renderCheckbox() {
    return (
      <div class={this.getCheckboxClasses()} ref={(cbDiv) => { this.checkboxDiv = cbDiv; }}>
        <input type="checkbox" id="checkbox"
          disabled={this.disabled}
          checked={this.checked}
          value={this.value}
          onChange={(evt: any) => {
            this.checked = this.mdcCheckbox.checked;
            this.change.emit(evt);
          }}
          class="mdc-checkbox__native-control" />
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
            viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark__path"
              fill="none"
              stroke="white"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
              style={{ 'stroke-width': '3.12px' }} />
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
      </div>
    );
  }
  renderCheckboxWithLabel() {
    return (
      <div
        class={{ 'mdc-form-field--align-end': this.alignLabel === 'right', 'mdc-form-field': true }}>
        <label>
          {this.renderCheckbox()}
          {this.label}
        </label>
      </div>
    );
  }
  render() {
    if (this.label) {

      return this.renderCheckboxWithLabel();
    }
    return this.renderCheckbox();
  }
}
