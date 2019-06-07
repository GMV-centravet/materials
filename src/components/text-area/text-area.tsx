import { MDCFloatingLabel } from '@material/floating-label';
import { MDCNotchedOutline } from '@material/notched-outline';
import { MDCTextField } from '@material/textfield';
import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-text-area',
  styleUrl: 'text-area.scss',
  shadow: true
})

export class TextArea {
  textFieldEl: HTMLElement;
  floatingLabelEl: HTMLElement;
  notchedOutlineEl: HTMLElement;

  private mdcTextField: MDCTextField;

  @Prop() label: string;
  @Prop() disabled: boolean;
  @Prop() required = false;
  @Prop() fullwidth: boolean;
  @Prop() outlined: boolean;
  @Prop() rows = 4;
  @Prop() cols = 40;
  @Prop({ mutable: true, reflectToAttr: true }) value: string;

  @Event() input: EventEmitter;
  @Event() change: EventEmitter;

  @Watch('value')
  updateValue() {
    if (this.mdcTextField) {
      this.mdcTextField.value = this.value;
    }
  }

  componentDidLoad() {
    this.mdcTextField = new MDCTextField(this.textFieldEl);
    MDCFloatingLabel.attachTo(this.floatingLabelEl);
    if (this.outlined) {
      MDCNotchedOutline.attachTo(this.notchedOutlineEl);
    }
  }
  getClasses() {
    return {
      'mdc-text-field': true,
      'mdc-text-field--textarea': true,
      'mdc-text-field--fullwidth': this.fullwidth,
      'mdc-text-field--disabled': this.disabled
    };
  }

  getLabelClasses() {
    return {
      'mdc-floating-label': true,
      'mdc-floating-label--float-above': !!this.value
    };
  }
  render() {
    return (
      <div class={this.getClasses()} ref={mdcTextField => { this.textFieldEl = mdcTextField; }}>
        <textarea id="textarea" class="mdc-text-field__input"
          rows={this.rows}
          cols={this.cols}
          value={this.value}
          required={this.required}
          onChange={(ev: any) => this.change.emit(ev)}
          onInput={(ev: any) => {
            this.value = ev.target.value;
            this.input.emit(ev);
          }}>
        </textarea>
        {this.outlined ?
          <div class="mdc-notched-outline" ref={notchedOutlineEl => this.notchedOutlineEl = notchedOutlineEl}>
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch">
              <label style={{ 'background-color': 'transparent' }} htmlFor="textarea" class={this.getLabelClasses()} ref={el => this.floatingLabelEl = el}>{this.label}</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
          </div>
          : <label style={{ 'background-color': 'transparent' }} htmlFor="textarea" class={this.getLabelClasses()} ref={el => this.floatingLabelEl = el}>{this.label}</label>
        }
      </div >
    );
  }
}
