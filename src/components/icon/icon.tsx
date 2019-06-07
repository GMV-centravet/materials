import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-icon',
  styleUrls: ['icon.scss'],
  shadow: true,
})

export class Icon {
  @Element() iconEl: HTMLElement;
  @Prop() size: number;
  @Prop() light: boolean;
  @Prop() dark: boolean;
  @Prop() disabled: boolean;
  @Prop() color: string;
  @Prop() name: string;


  setClass() {
    const classes = {
      'material-icons': true,
      'md-light': this.light,
      'md-dark': this.dark || this.disabled
    };
    return classes;
  }
  render() {
    return (
      <i style={{ 'font-size': this.size + 'px', color: this.color }} class={this.setClass()}>
        {this.name}
      </i>
    );
  }
}
