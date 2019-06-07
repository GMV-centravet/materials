import { Component, h } from '@stencil/core';

@Component({
  tag: 'materials-card-content',
  shadow: false
})
export class CardContent {
  cardContentEl: any;
  componentDidLoad() {
    this.cardContentEl.style.setProperty('padding', '16px 16px 16px 16px');

    // this.cardContentEl.style.setProperty('padding-bottom','24px')
  }
  render() {
    return (
      <section ref={el => this.cardContentEl = el}>
        <slot />
      </section>
    );
  }
}
