import { Component, h } from '@stencil/core';

@Component({
  tag: 'materials-chip',
  styleUrl: 'chip.scss',
  shadow: true
})
export class Chip {
  render() {
    return (
      <div class="mdc-chip-set">
        <div class="mdc-chip" tabindex="0">
          <div class="mdc-chip__text">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
