import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {

  @Element() cardEl: HTMLElement;

  @Prop() width = 'auto';
  @Prop() height = 'auto';
  @Prop() maxHeight: string;
  @Prop() elevation = 1;
  @Prop() padding: number;

  private mdcCardEl: any;

  componentDidLoad() {
    if (this.maxHeight) this.mdcCardEl.style.setProperty('max-height', this.maxHeight);
  }
  render() {
    return (
      <div
        ref={elRef => { this.mdcCardEl = elRef; }}
        class={`mdc-card mdc-elevation--z${this.elevation}`}
        style={{ 'height': this.height, 'width': this.width, 'padding': this.padding ? this.padding + 'px' : null }}>
        <slot />
      </div>
    );
  }
}
