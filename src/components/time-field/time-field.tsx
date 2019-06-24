import { Component, Event, EventEmitter, h, Host, Method, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-time-field',
  styleUrl: 'time-field.scss',
  shadow: true
})

/**
 * A simple time field component with an integrated timepicker and custom validation capability.
 * Basic usage : <materials-time-field value="12:00"></materials-time-field>
 */
export class TimeField {
  private materialsMenuTimepickerEl: HTMLMaterialsMenuElement;
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

  /** Display a timepicker when clicking on the time-field */
  @Prop() timepicker = true;

  /** The timepicker options interval (in minutes) */
  @Prop() timepickerStep = 15;

  /** The timepicker format */
  @Prop() timepickerFormat: '12h' | '24h' = '24h';

  /**
   * Provide a custom validation function to this time-field.
   * In case of error, the promise should return a message with the
   * error message to display
   */
  @Prop() customValidation: () => Promise<string>;

  /** Return the time-field current value validity */
  @Method()
  async isValid() {
    return await this.materialsTextFieldEl.isValid();
  }

  /** Force the validation of thid time field (native validation + custom validation) */
  @Method()
  async forceValidation() {
    this.materialsTextFieldEl.forceValidation();
  }

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

  private renderTimePicker() {
    if (!this.timepicker) return;
    return <materials-menu maxHeight={200}
      noPadding ref={el => this.materialsMenuTimepickerEl = el}>
      <materials-timepicker
        timeSelected={this.value}
        clock24={this.timepickerFormat === '24h'}
        step={this.timepickerStep}
        onTimeSelectedChange={ev => {
          this.value = ev.detail;
          this.input.emit(); // pour déclencher la validation en fonction de onInput
          if (this.materialsMenuTimepickerEl) this.materialsMenuTimepickerEl.close();
        }}
        onClick={ev => ev.stopPropagation()}>
      </materials-timepicker>
    </materials-menu>;
  }

  private async openPicker(ev): Promise<void> {
    if (this.disabled) {
      return;
    }
    if (this.timepicker) {
      ev.stopPropagation();
      ev.preventDefault();
      if (this.materialsMenuTimepickerEl) {
        await this.materialsMenuTimepickerEl.open();
        // timepicker scroll auto
        const timepicker: HTMLMaterialsTimepickerElement = this.materialsMenuTimepickerEl.querySelector('materials-timepicker');
        const scrollableContainer = this.materialsMenuTimepickerEl.shadowRoot.querySelector('.mdc-menu');
        const selectedItem: HTMLMaterialsListItemElement = timepicker.shadowRoot.querySelector('materials-list-item[selected]');
        // positione l'élément au milieu de la liste deroulante.
        if (timepicker && scrollableContainer && selectedItem) scrollableContainer.scrollTop = selectedItem.offsetTop - 60;
      }
    }
  }

  render() {
    return (
      <Host class={{ 'materials-time-field--dense': this.dense }}>
        <materials-text-field class="timepicker-with-value"
          type="time"
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
        {this.renderTimePicker()}
      </Host>
    );
  }

}
