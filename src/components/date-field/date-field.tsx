import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { yyyymmdd } from '../../utils/utils';

@Component({
  tag: 'materials-date-field',
  styleUrl: 'date-field.scss',
  shadow: true
})

export class DateField {
  private MWCMenuDatepickerEl: HTMLMaterialsMenuElement;
  private MWCMenuTimepickerEl: HTMLMaterialsMenuElement;
  private mwcTextFieldEl: HTMLMaterialsTextFieldElement;
  private type = 'date';

  private trailingIcon = null;

  @Element() host: HTMLMaterialsDateFieldElement;
  @Event() input: EventEmitter;
  @Event() change: EventEmitter;
  @Prop() fullwidth: boolean;

  @Prop() dense: boolean;
  @Prop() outlined: boolean;
  @Prop() focused: boolean;

  @Prop() disabled: boolean;
  @Prop() leadingIcon: string;

  @Prop() label: string;
  @Prop() name: string;

  // Input
  @Prop() required: boolean;
  @Prop() pattern: string;
  @Prop({ mutable: true, reflectToAttr: true }) value: any;
  @Prop() width: number;
  // Helper
  @Prop() helperText: string;
  @Prop() persistent: boolean;
  @Prop() validation: boolean;
  @Prop() timepicker: boolean;
  @Prop() timepickerStep = 15;
  @Prop() timepickerClock24: boolean;

  @Prop() customValidation: () => boolean | Promise<boolean>;
  @Prop() customValidationMessage: string;

  @Prop() datepicker = false;
  @Prop() datepickerTodayPicker = true;
  @Prop() datepickerMonthPicker = true;
  @Prop() datepickerYearPicker = true;

  @State() displayingHelperText: string;


  componentWillLoad() {
    this.type = this.timepicker ? 'time' : 'date';
  }

  @Watch('value')
  updateValue() {
    if (this.mwcTextFieldEl) {
      this.mwcTextFieldEl.value = this.value;
    }
  }

  @Method()
  async isValid() {
    return this.mwcTextFieldEl.isValid();
  }

  @Method()
  async forceValidation() {
    return this.mwcTextFieldEl.forceValidation();
  }


  renderDatepicker() {
    if (!this.datepicker) return;
    return (

      <materials-menu noPadding ref={el => this.MWCMenuDatepickerEl = el as HTMLMaterialsMenuElement}>
        <materials-card elevation={4} width="fit-content">
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
              if (this.MWCMenuDatepickerEl) this.MWCMenuDatepickerEl.close();
            }}
            onClick={ev => ev.stopPropagation()}>
          </materials-datepicker>
        </materials-card>
      </materials-menu>
    );
  }

  renderTimePicker() {
    if (!this.timepicker) return;
    return <materials-menu noPadding ref={el => this.MWCMenuTimepickerEl = el}>
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
      <Host class={{ 'materials-date-field--dense': this.dense }}>
        <materials-text-field class="datepicker-with-value"
          type={this.type}
          value={this.value}
          label={this.label}
          fullwidth={this.fullwidth}
          dense={this.dense}
          outlined={this.outlined}
          focused={this.focused}
          disabled={this.disabled}
          leadingIcon={this.leadingIcon}
          required={this.required}
          pattern={this.pattern}
          width={this.width}
          helperText={this.helperText}
          persistent={this.persistent}
          trailingIcon={this.trailingIcon}
          hideNativeClear
          ref={el => this.mwcTextFieldEl = el}
          onClick={ev => this.openPicker(ev)}>
        </materials-text-field>
        {this.renderDatepicker()}
        {this.renderTimePicker()}
      </Host>
    );
  }

}
