import { MDCFormField } from '@material/form-field';
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-form-field',
  styleUrl: 'form-field.scss',
  shadow: true
})

export class FormField {
  private formFieldEl: any;
  @Prop() alignEnd: boolean;
  @Prop() label: string;

  componentDidLoad() {
    MDCFormField.attachTo(this.formFieldEl);
  }
  render() {
    return (
      <div class={{ 'mdc-form-field': true, 'mdc-form-field--align-end': this.alignEnd }} ref={el => this.formFieldEl = el}>
        <slot />
        <label>{this.label}</label>
      </div>
    );
  }
}
