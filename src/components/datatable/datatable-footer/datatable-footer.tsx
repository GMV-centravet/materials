import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-datatable-footer',
  styleUrl: 'datatable-footer.scss',
  shadow: true
})
export class DatatableFooter {


  @Prop() color: 'primary' | 'secondary';

  render() {
    return (
      <div class="container">
        <slot />
      </div>
    );
  }
}
