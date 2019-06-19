import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

import { Sort, SortDirection } from '../sort';

@Component({
  tag: 'materials-datatable-header-column',
  styleUrl: 'datatable-header-column.scss',
  shadow: true
})
export class DatatableHeaderColumn {

  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() value: string;
  @Prop() description: string;
  @Prop() sortable: boolean;
  @Prop({ mutable: true }) sorted: boolean;
  @Prop() align: 'start' | 'end' | 'center' = 'start';
  @Prop() width: string;

  @Event() sort: EventEmitter<Sort>;

  @State() direction: SortDirection = SortDirection.ASC;

  sortData() {
    if (this.sortable) {
      this.sort.emit(new Sort(this.value, this.direction));
      this.direction = this.direction === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;
    }
  }

  getColumnClasses() {
    return {
      'header-column': true,
      'non-sortable-column': !this.sortable,
      'sortable-column': this.sortable,
      'sorted': this.sortable && this.sorted,
    };
  }

  render() {
    return (
      <Host
        class={{
          'align-start': this.align === 'start',
          'align-end': this.align === 'end',
          'align-center': this.align === 'center',
          'sortable': this.sortable
        }}
        style={{
          'flex': this.width ? `0 0 ${this.width}` : null,
          'width': this.width ? this.width : null
        }}>
        <div class={this.getColumnClasses()} title={this.description ? this.description : this.label} onClick={() => this.sortData()}>
          <div class="label">{this.label}</div>
          {this.sortable && <materials-icon class="sort-direction" name={this.direction === SortDirection.DESC ? 'arrow_upward' : 'arrow_downward'}></materials-icon>}
        </div>
      </Host>
    );
  }
}
