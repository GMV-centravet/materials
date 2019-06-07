import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';


/**
 * WARNING : Element en shadow : False.
 * en shadow : True, il ne détecte pas l'attribut "name" de ses voisins.
 */
@Component({
  tag: 'materials-radio',
  styleUrl: 'radio.scss',
  shadow: true
})

export class Radio {
  private radioEl: HTMLElement;
  private formFieldEl: any;
  @Event() change: EventEmitter;
  @Prop() name: string;
  @Prop() label: string;
  @Prop() value: string | number | string[];
  @Prop() required: boolean;
  @Prop() disabled: boolean;
  @Prop() alignEnd: boolean;
  @Prop() noPadding: boolean;
  @Prop({ mutable: true }) checked: boolean;

  componentWillLoad() {
    // Dans le cas ou materials-radio est utilisé dans un materials-radio-group.
    if (this.checked) this.change.emit(this.value);
  }
  componentDidLoad() {
    MDCRadio.attachTo(this.radioEl);
    MDCFormField.attachTo(this.formFieldEl);
  }

  handleClick() {
    this.checked = true;
    this.change.emit(this.value);
  }

  render() {
    return (
      <div class={{ 'mdc-form-field': true, 'mdc-form-field--align-end': this.alignEnd, 'checked': this.checked }} ref={el => this.formFieldEl = el} >
        <div class={{ 'mdc-radio': true, 'mdc-radio--disabled': this.disabled }} ref={el => this.radioEl = el}>
          <input id="radio" class="mdc-radio__native-control" type="radio" name={this.name} value={this.value} required={this.required} disabled={this.disabled}
            onClick={() => this.handleClick()}
            checked={this.checked} />
          <div class="mdc-radio__background">
            <div class="mdc-radio__outer-circle"></div>
            <div class="mdc-radio__inner-circle"></div>
          </div>
        </div>
        <label style={{ 'padding': this.noPadding ? '0px' : '' }} htmlFor="radio">{this.label}</label>
      </div>
    );
  }
}
