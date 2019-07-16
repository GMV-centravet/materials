import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-headline',
  styleUrl: 'headline.scss',
  shadow: true
})

export class Headline {

  @Prop() level: '1' | '2' | '3' | '4' | '5' | '6';

  private getClasses() {
    const classes = { 'mdc-typography': true };
    classes['mdc-typography--headline' + this.level] = true;
    return classes;
  }

  render() {
    return (
      <header class={this.getClasses()}>
        <slot />
      </header>
    );
  }
}
