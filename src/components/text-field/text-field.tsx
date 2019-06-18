import { MDCFloatingLabel } from '@material/floating-label';
import { MDCLineRipple } from '@material/line-ripple';
import { MDCNotchedOutline } from '@material/notched-outline';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

/**
 * Pour utiliser le datepicker il est préférable de mettre la Prop type=text
 */
@Component({
  tag: 'materials-text-field',
  styleUrl: 'text-field.scss',
  shadow: true
})

export class TextField {
  private MWCMenuDatepickerEl: HTMLMaterialsMenuElement;
  private MWCMenuTimepickerEl: HTMLMaterialsMenuElement;
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
  @Prop() fullwidth: boolean;

  @Prop() dense: boolean;
  @Prop() outlined: boolean;
  @Prop() focused: boolean;

  @Prop() disabled: boolean;
  @Prop() leadingIcon: string;
  @Prop() trailingIcon: string;

  @Prop() label: string;
  @Prop() name: string;
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
  @Prop() timepicker: boolean;
  @Prop() timepickerStep = 15;
  @Prop() timepickerClock24: boolean;

  @Prop() customValidation: () => Promise<string>;

  @Prop() datepicker = false;
  @Prop() datepickerTodayPicker = true;
  @Prop() datepickerMonthPicker = true;
  @Prop() datepickerYearPicker = true;

  @State() realHelperText: string;

  componentWillLoad() {
    if(!this.value){
      this.value ='';
    }
  }

  @Watch('value')
  async updateValue() {
    if(!this.value){
      this.value ='';
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

  renderDatepicker() {
    if (!this.datepicker) return;
    return <materials-menu noPadding ref={el => this.MWCMenuDatepickerEl = el as HTMLMaterialsMenuElement}>
      <materials-card elevation={4} width="fit-content">
        <materials-datepicker
          class="date-picker"
          dateSelected={this.value ? new Date(this.value + 'T00:00:00') : new Date(new Date().setHours(0, 0, 0, 0))}
          today-picker={this.datepickerTodayPicker}
          yearPicker={this.datepickerYearPicker}
          monthPicker={this.datepickerMonthPicker}
          onDateSelectedUpdate={ev => {
            const fullDate = new Date(ev.detail);
            this.value = `${fullDate.getFullYear().toString().padStart(4, '0')}-${(fullDate.getMonth() + 1).toString().padStart(2, '0')}-${(fullDate.getDate()).toString().padStart(2, '0')}`;
            this.input.emit(); // pour déclencher la validation en fonction de onInput
            if (this.MWCMenuDatepickerEl) this.MWCMenuDatepickerEl.close();
          }}
          onClick={ev => ev.stopPropagation()}>
        </materials-datepicker>
      </materials-card>
    </materials-menu>;
  }
  renderTimePicker() {
    if (!this.timepicker) return;
    return <materials-menu noPadding ref={el => this.MWCMenuTimepickerEl = el as HTMLMaterialsMenuElement}>
      <materials-card elevation={4} width="188px" max-height="200px">
        <materials-timepicker
          timeSelected={this.value}
          clock24={this.timepickerClock24}
          step={this.timepickerStep}
          onTimeSelectedChange={ev => {
            this.value = ev.detail;
            this.input.emit(); // pour déclencher la validation en fonction de onInput
            if (this.MWCMenuTimepickerEl) this.MWCMenuTimepickerEl.close();
          }}
          onClick={ev => ev.stopPropagation()}>
        </materials-timepicker>
      </materials-card>
    </materials-menu>;
  }
  openPicker(ev): void {
    if (this.datepicker) {
      ev.stopPropagation();
      ev.preventDefault();
      if (this.MWCMenuDatepickerEl) this.MWCMenuDatepickerEl.open();
    }
    if (this.timepicker) {
      ev.stopPropagation();
      ev.preventDefault();
      if (this.MWCMenuTimepickerEl) {
        this.MWCMenuTimepickerEl.open();
        // timepicker scroll auto
        const timepicker: HTMLMaterialsTimepickerElement = this.MWCMenuTimepickerEl.querySelector('materials-timepicker');
        const scrollableContainer = this.MWCMenuTimepickerEl.shadowRoot.querySelector('.mdc-menu');
        const selectedItem: HTMLMaterialsListItemElement = timepicker.shadowRoot.querySelector('materials-list-item[selected]');
        // positione l'élément au milieu de la liste deroulante.
        if (timepicker && scrollableContainer && selectedItem) scrollableContainer.scrollTop = selectedItem.offsetTop - 60;
      }
    }
  }
  render() {
    return (
      <Host class={{ 'materials-text-field--dense': this.dense }}>
        <div style={{ 'width': this.width + 'px' }} class={this.getClasses()} ref={mdcTextField => this.textFieldEl = mdcTextField}>
          {(() => {
            return this.leadingIcon ? (<i class="material-icons mdc-text-field__icon" tabindex="0" role="button" onClick={ev => this.openPicker(ev)}>{this.leadingIcon}</i>) : '';
          })()}
          <input
            id="my-text-field"
            class={{ 'mdc-text-field__input': true, 'datepicker': this.datepicker, 'mdc-text-field--overflow-elipsis': this.overflow }}
            type={this.type}
            pattern={this.pattern}
            value={this.value}
            disabled={this.disabled}
            required={this.required}
            name={this.name}
            ref={el => this.inputEl = el}
            onInput={(ev: any) => {
              this.value = ev.target.value;
              this.input.emit(ev);
            }}
            onChange={(ev: any) => this.change.emit(ev)}
            onClick={ev => this.openPicker(ev)}
          />
          {this.trailingIcon && (<i class="material-icons mdc-text-field__icon" tabindex="0" role="button" onClick={ev => this.openPicker(ev)}>{this.trailingIcon}</i>)}
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
            ref={el => this.helperTextEl = el}>
            {this.realHelperText}
          </div>
        </div>
        {this.renderDatepicker()}
        {this.renderTimePicker()}
      </Host>
    );
  }

}
