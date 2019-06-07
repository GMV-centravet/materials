import { Component, h } from '@stencil/core';

@Component({
  tag: 'materials-datatable-body',
  styleUrl: 'datatable-body.scss',
  shadow: true
})
export class DatatableBody {

  render() {
    return (
      <div class="container">
        <slot />
      </div>
    );
  }
}
