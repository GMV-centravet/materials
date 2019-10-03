import { MDCFloatingLabel } from '@material/floating-label';
import { MDCLineRipple } from '@material/line-ripple';
import { MDCNotchedOutline } from '@material/notched-outline';
import { MDCTextField, MDCTextFieldIcon } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'materials-text-field',
  styleUrl: 'text-field.scss',
  shadow: true
})

export class TextField {
  private mdcTextField: MDCTextField;
  private mdcTextFieldHelperText: MDCTextFieldHelperText;
  private textFieldEl: HTMLElement;
  private floatingLabelEl: HTMLElement;
  private lineRippleEl: HTMLElement;
  private helperTextEl: HTMLElement;
  private notchedOutlineEl: HTMLElement;
  private inputEl: HTMLInputElement;

  @Element() host: HTMLMaterialsTextFieldElement;

  @Event() input: EventEmitter;
  @Event() change: EventEmitter;
  /** Emitted when a trailing icon is pressed */
  @Event() trailingIconPress: EventEmitter;
  /** Emitted when a leading icon is pressed */
  @Event() leadingIconPress: EventEmitter;

  @Prop() fullwidth: boolean;
  @Prop() dense: boolean;
  @Prop() outlined: boolean;
  @Prop() focused: boolean;
  @Prop() disabled: boolean;
  @Prop() readonly: boolean;
  @Prop() leadingIcon: string;
  @Prop() trailingIcon: string;
  @Prop() label: string;
  @Prop() name: string;

  /** Hide clear button (webkit + Edge, Moz not supported) */
  @Prop() hideNativeClear = false;

  // Input
  @Prop() type = 'text';
  @Prop() required: boolean;
  @Prop() pattern: string;
  @Prop({ mutable: true, reflectToAttr: true }) value: any;
  @Prop() width: number;
  @Prop() overflow: boolean;
  // Helper
  @Prop() helperText: string;
  @Prop() persistent: boolean;

  @Prop() customValidation: () => Promise<string>;

  @State() realHelperText: string;

  componentWillLoad() {
    if (!this.value) {
      this.value = '';
    }
  }

  @Watch('value')
  async updateValue() {
    if (!this.value) {
      this.value = '';
      return;
    }
    if (this.mdcTextField) {
      this.mdcTextField.value = this.value;
      await this.forceValidation();
    }
  }

  componentDidLoad() {
    this.mdcTextField = new MDCTextField(this.textFieldEl);
    this.mdcTextField.useNativeValidation = false;
    if (this.label) {
      MDCFloatingLabel.attachTo(this.floatingLabelEl);
    }
    this.mdcTextFieldHelperText = new MDCTextFieldHelperText(this.helperTextEl);
    this.mdcTextFieldHelperText.foundation.setContent(this.helperText);
    this.mdcTextFieldHelperText.foundation.setPersistent(this.persistent);
    if (this.outlined) {
      MDCNotchedOutline.attachTo(this.notchedOutlineEl);
    } else {
      MDCLineRipple.attachTo(this.lineRippleEl);
    }
    if (this.leadingIcon && this.leadingIconPress) {
      MDCTextFieldIcon.attachTo(this.host.shadowRoot.querySelector('.materials-leading-icon'));
    }
    if (this.trailingIcon && this.trailingIconPress) {
      MDCTextFieldIcon.attachTo(this.host.shadowRoot.querySelector('.materials-trailing-icon'));
    }
  }

  getClasses() {
    return {
      'mdc-text-field': true,
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--fullwidth': this.fullwidth,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--focused': this.focused,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--with-leading-icon': !!this.leadingIcon,
      'mdc-text-field--with-trailing-icon': !!this.trailingIcon
    };
  }
  getLabelClasses() {
    return {
      'mdc-floating-label': true
    };
  }

  @Method()
  async isValid() {
    const nativeValidation = this.inputEl.validity.valid;
    if (!nativeValidation) {
      return false;
    }
    if (this.customValidation) {
      return !(await this.customValidation());
    }
    return true;
  }

  @Method()
  async forceValidation() {
    const nativeValidation = this.inputEl.validity.valid;
    if (!nativeValidation) {
      this.mdcTextField.valid = false;
      this.mdcTextFieldHelperText.foundation.setContent(this.inputEl.validationMessage);
      this.mdcTextFieldHelperText.foundation.setValidation(true);
      this.realHelperText = this.inputEl.validationMessage;
      return;
    }
    if (this.customValidation) {
      const validatonMessage = await this.customValidation();
      if (validatonMessage) {
        this.mdcTextField.valid = false;
        this.mdcTextFieldHelperText.foundation.setContent(validatonMessage);
        this.mdcTextFieldHelperText.foundation.setValidation(true);
        this.realHelperText = validatonMessage;
        return;
      }
    }
    this.mdcTextField.valid = true;
    this.mdcTextFieldHelperText.foundation.setContent(this.helperText);
    this.mdcTextFieldHelperText.foundation.setValidation(false);
    this.realHelperText = this.helperText;
  }

  render() {
    return (
      <Host class={{ 'materials-text-field--dense': this.dense }}>
        <div style={{ 'width': this.width ? (this.width + 'px') : '100%' }} class={this.getClasses()} ref={mdcTextField => this.textFieldEl = mdcTextField}>
          {this.leadingIcon &&
            <i class="materials-leading-icon material-icons mdc-text-field__icon" onClick={(ev: any) => this.leadingIconPress.emit(ev)} tabindex="0" role="button">{this.leadingIcon}</i>
          }
          <input
            id="my-text-field"
            class={{ 'mdc-text-field__input': true, 'hide-native-clear': this.hideNativeClear, 'mdc-text-field--overflow-elipsis': this.overflow }}
            type={this.type}
            pattern={this.pattern}
            value={this.value}
            disabled={this.disabled}
            required={this.required}
            readonly={this.readonly}
            name={this.name}
            ref={el => this.inputEl = el}
            onInput={(ev: any) => {
              this.value = ev.target.value;
              this.input.emit(ev);
            }}
            onChange={(ev: any) => this.change.emit(ev)}
          />
          {this.trailingIcon &&
            <i onClick={(ev: any) => this.trailingIconPress.emit(ev)} class="materials-trailing-icon material-icons mdc-text-field__icon" tabindex="0" role="button">{this.trailingIcon}</i>
          }
          {this.outlined ?
            <div class="mdc-notched-outline" ref={notchedOutlineEl => this.notchedOutlineEl = notchedOutlineEl}>
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                {this.label && <label class={this.getLabelClasses()} ref={el => this.floatingLabelEl = el} >{this.label}</label>}
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
            : this.label && <label class={this.getLabelClasses()} ref={el => this.floatingLabelEl = el} >{this.label}</label>}
          {this.outlined ? '' : <div class="mdc-line-ripple" ref={el => this.lineRippleEl = el}></div>}
        </div>
        <div class="mdc-text-field-helper-line">
          <div id="helper-text"
            class={{ 'mdc-text-field-helper-text': true }}
            aria-hidden="true"
            ref={el => this.helperTextEl = el} />
        </div>
      </Host>
    );
  }

}
