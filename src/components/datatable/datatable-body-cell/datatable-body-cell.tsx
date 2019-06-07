import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'materials-datatable-body-cell',
  styleUrl: 'datatable-body-cell.scss',
  shadow: true
})
export class DatatableBodyCell {

  @Prop() width: string;

  @Prop() align: 'start' | 'end' | 'center' = 'start';

  render() {
    return (
      <Host class={{
        'align-start': this.align === 'start',
        'align-end': this.align === 'end',
        'align-center': this.align === 'center'
      }} style={{
        'flex': this.width ? `0 0 ${this.width}` : null,
        'width': this.width ? this.width : null
      }}>
        <div class="row-cell">
          <div class="cell-content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
