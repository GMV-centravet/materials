import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-subtitle',
  styleUrl: 'subtitle.scss',
  shadow: true
})

export class Subtitle {

  @Prop() level: '1' | '2';

  private getClasses() {
    const classes = { 'mdc-typography': true };
    classes['mdc-typography--subtitle' + this.level] = true;
    return classes;
  }

  render() {
    return (
      <div class={this.getClasses()}>
        <slot />
      </div>
    );
  }
}
