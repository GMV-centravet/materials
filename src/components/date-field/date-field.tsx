import { Component, Event, EventEmitter, h, Host, Method, Prop, Watch } from '@stencil/core';

import { yyyymmdd } from '../../utils/utils';

@Component({
  tag: 'materials-date-field',
  styleUrl: 'date-field.scss',
  shadow: true
})

export class DateField {
  private materialsMenuDatepickerEl: HTMLMaterialsMenuElement;
  private materialsTextFieldEl: HTMLMaterialsTextFieldElement;

  /** Emitted when the input text change */
  @Event() input: EventEmitter;

  /**
   * Styles the date field as a full width text field.
   * Warning : do not use with outlined
   */
  @Prop() fullwidth: boolean;

  /** Styles the date field as a dense text field. */
  @Prop() dense: boolean;

  /** Render an outlined date field */
  @Prop() outlined: boolean;

  /** Styles the date field as a text field in focus. */
  @Prop() focused: boolean;

  /** Styles the date field as a disabled text field. */
  @Prop() disabled: boolean;

  /**
   * Add a leading icon to ths date field.
   * You have to pass a material icon name
   */
  @Prop() leadingIcon: string;

  /** The date field label. */
  @Prop() label: string;

  /** Mark this date field as required */
  @Prop() required: boolean;

  /** The date field value */
  @Prop({ mutable: true, reflectToAttr: true }) value: any;

  /** The date field width */
  @Prop() width: number;

  /** Add an helper text to this date field */
  @Prop() helperText: string;

  /** Set the helper text persistant (appears on focus otherwise) */
  @Prop() persistent: boolean;


  /**
   * Provide a custom validation function to this time-field.
   * In case of error, the promise should return a message with the
   * error message to display
   */
  @Prop() customValidation: () => Promise<string>;

  /** Display a datepicker when clicking on the date-field */
  @Prop() datepicker = true;

  /** The datepicker has a today button */
  @Prop() datepickerTodayPicker = true;

  /** The datepicker has a month navigation bar */
  @Prop() datepickerMonthPicker = true;

  /** The datepicker has a year navigation bar */
  @Prop() datepickerYearPicker = true;

  componentWillLoad() {
    if (this.outlined && this.fullwidth) {
      console.warn('[materials-date-field] You should not use fullwidth and outlined together');
    }
  }

  @Watch('value')
  updateValue() {
    if (this.materialsTextFieldEl) {
      this.materialsTextFieldEl.value = this.value;
    }
  }

  @Method()
  async isValid() {
    return await this.materialsTextFieldEl.isValid();
  }

  @Method()
  async forceValidation() {
    this.materialsTextFieldEl.forceValidation();
  }


  renderDatepicker() {
    if (!this.datepicker) return;
    return (

      <materials-menu noPadding ref={el => this.materialsMenuDatepickerEl = el}>
        <materials-card padding={16} elevation={4} width="fit-content">
          <materials-datepicker
            class="date-picker"
            dateSelected={this.value ? new Date(this.value) : new Date()}
            today-picker={this.datepickerTodayPicker}
            yearPicker={this.datepickerYearPicker}
            monthPicker={this.datepickerMonthPicker}
            nullable={!this.required}
            onDateSelectedUpdate={ev => {
              this.value = ev.detail ? yyyymmdd(ev.detail) : '';
              this.input.emit(); // pour déclencher la validation en fonction de onInput
              if (this.materialsMenuDatepickerEl) this.materialsMenuDatepickerEl.close();
            }}
            onClick={ev => ev.stopPropagation()}>
          </materials-datepicker>
        </materials-card>
      </materials-menu>
    );
  }

  async openPicker(ev): Promise<void> {
    if (this.disabled) {
      return;
    }
    if (this.datepicker) {
      ev.stopPropagation();
      ev.preventDefault();
      if (this.materialsMenuDatepickerEl) this.materialsMenuDatepickerEl.open();
    }
  }
  render() {
    return (
      <Host class={{ 'materials-date-field--dense': this.dense }}>
        <materials-text-field class="datepicker-with-value"
          type="date"
          value={this.value}
          label={this.label}
          fullwidth={this.fullwidth}
          dense={this.dense}
          outlined={this.outlined}
          focused={this.focused}
          disabled={this.disabled}
          leadingIcon={this.leadingIcon}
          required={this.required}
          width={this.width}
          helperText={this.helperText}
          persistent={this.persistent}
          hideNativeClear
          customValidation={this.customValidation}
          ref={el => this.materialsTextFieldEl = el}
          onInput={ev => {
            ev.stopPropagation();
            this.input.emit(ev.detail);
          }}
          onClick={ev => this.openPicker(ev)}>
        </materials-text-field>
        {this.renderDatepicker()}
      </Host>
    );
  }

}
