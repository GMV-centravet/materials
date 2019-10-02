import { MDCNotchedOutline } from '@material/notched-outline';
import { MDCSelect, MDCSelectHelperText } from '@material/select';
import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';


// TODO: gestion des tags <optgroup label="">

@Component({
  tag: 'materials-select',
  styleUrl: 'select.scss',
  shadow: true
})
/**
 * Using the floating label as the placeholder
 * By default, <select> elements will select their first enabled option.
 * In order to initially display a placeholder instead,
 * add an initial <option> element with the disabled
 *  and selected attributes set, and with value set to "".
 */

/**
 * Select with pre-selected option
 * When dealing with a select component that has a pre-selected value,
 * include the mdc-floating-label--float-above modifier class
 *  on the mdc-floating-label element
 */
export class Select {
  private selectEl: HTMLElement;
  private mdcSelect: MDCSelect;
  private mdcHelperText: MDCSelectHelperText;
  private mdcNotchedOutline: MDCNotchedOutline;
  private selectTagEl: HTMLSelectElement;
  private notchedOutlineEl: HTMLElement;
  @Element() host: HTMLMaterialsSelectElement;
  @Event() select: EventEmitter;
  @Event() change: EventEmitter;

  @Prop() disabled: boolean;
  @Prop() box: boolean;
  @Prop() dense: boolean;
  @Prop() outlined: boolean;
  @Prop() required: boolean;
  @Prop() defaultEmpty: boolean;
  @Prop() label: string;
  @Prop() name: string;
  @Prop() width: string;
  @Prop() leadingIcon: string;
  @Prop() helperText: string;
  @Prop({ mutable: true, reflect: true }) value: any;

  @Prop() customValidation: () => Promise<string>;

  @Prop() options: Map<string | number, string>;

  @State() realHelperText: string;

  async componentDidLoad() {
    await this.initMdcSelect();
  }

  async componentDidUnload() {
    this.destroyMdc();
  }

  @Watch('options')
  async watchOptions() {
    this.destroyMdc();
    await this.initMdcSelect();
  }

  @Watch('value')
  async watchValue() {
    if (this.mdcSelect) {
      this.mdcSelect.value = this.value ? this.value : '';
      await this.forceValidation();
    }
  }

  @Watch('disabled')
  async watchDisabled() {
    if (this.mdcSelect) {
      this.mdcSelect.disabled = this.disabled;
      await this.forceValidation();
    }
  }

  @Method()
  async isValid() {
    const nativeValidation = this.selectTagEl.validity.valid;
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
    const nativeValidation = this.selectTagEl.validity.valid;
    if (!nativeValidation) {
      this.mdcSelect.valid = false;
      this.mdcHelperText.foundation.setContent(this.selectTagEl.validationMessage);
      this.mdcHelperText.foundation.setValidation(true);
      this.realHelperText = this.selectTagEl.validationMessage;
      return;
    }
    if (this.customValidation) {
      const validatonMessage = await this.customValidation();
      if (validatonMessage) {
        this.mdcSelect.valid = false;
        this.mdcHelperText.foundation.setContent(validatonMessage);
        this.mdcHelperText.foundation.setValidation(true);
        this.realHelperText = validatonMessage;
        return;
      }
    }
    this.mdcSelect.valid = true;
    this.mdcHelperText.foundation.setContent(this.helperText);
    this.mdcHelperText.foundation.setValidation(false);
    this.realHelperText = '';
  }

  getClasses() {
    return {
      'materials-select': true,
      'mdc-select': true,
      'mdc-select--box': this.box,
      'mdc-select--disabled': this.disabled,
      'mdc-select--outlined': this.outlined,
      'mdc-select--with-leading-icon': !!this.leadingIcon,
      'materials-select--dense': this.dense
    };
  }

  getLabelClass() {
    return {
      'mdc-floating-label': true,
    };
  }

  private async initMdcSelect() {
    const optionNodesList = this.host.querySelectorAll('option');
    Array.from(optionNodesList).forEach((el: Node) => {
      this.selectTagEl.appendChild(el);
    });
    this.mdcSelect = new MDCSelect(this.selectEl);
    this.mdcHelperText = new MDCSelectHelperText(this.host.shadowRoot.querySelector('.mdc-select-helper-text'));
    this.mdcHelperText.foundation.setContent(this.helperText);
    await this.forceValidation();
    if (this.outlined) {
      this.mdcNotchedOutline = MDCNotchedOutline.attachTo(this.notchedOutlineEl);
    }
  }

  private destroyMdc() {
    this.mdcSelect.destroy();
    if (this.mdcNotchedOutline) {
      this.mdcNotchedOutline.destroy();
    }
  }

  render() {
    return ([
      <div style={{ 'width': this.width }} class={this.getClasses()} ref={el => this.selectEl = el} >
        {this.leadingIcon && <i class="material-icons mdc-select__icon" tabindex="0" role="button">{this.leadingIcon}</i>}
        <i class="mdc-select__dropdown-icon"></i>
        <select class="mdc-select__native-control"
          onChange={(ev) => {
            this.value = this.mdcSelect.value;
            this.change.emit(ev);
          }}
          name={this.name}
          disabled={this.disabled}
          ref={el => this.selectTagEl = el}
          required={this.required}>
          {this.defaultEmpty && <option value="" selected={!this.value} disabled={this.required}>&nbsp;</option>}
          {this.options && Array.from(this.options.keys()).map(optionValue => <option value={optionValue.toString()} selected={optionValue.toString() === this.value.toString()}>{this.options.get(optionValue)}</option>)}
          <slot />
        </select>

        {this.outlined ?
          <div class="mdc-notched-outline" ref={notchedOutlineEl => this.notchedOutlineEl = notchedOutlineEl}>
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch">
              <label class={this.getLabelClass()}>{this.label}{this.required}</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
          </div>
          :
          <label class={this.getLabelClass()}>{this.label}{this.required}</label>
        }
        {
          this.outlined ? '' : <div class="mdc-line-ripple"></div>
        }
      </div >,
      <p class="mdc-select-helper-text" aria-hidden="true"></p>
    ]
    );
  }
}
