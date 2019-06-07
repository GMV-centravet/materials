import { Component, Element, Event, EventEmitter, h, Listen, Prop, Watch } from '@stencil/core';

import { Sort } from './sort';

@Component({
  tag: 'materials-datatable',
  styleUrl: 'datatable.scss',
  shadow: true
})
export class Datatable {

  private header: HTMLMaterialsDatatableHeaderElement;
  private sortColsMap: Map<string, HTMLMaterialsDatatableHeaderColumnElement> = new Map();
  private footer: HTMLMaterialsDatatableFooterElement;
  private rows: HTMLMaterialsDatatableBodyRowElement[];

  @Element() host: HTMLMaterialsDatatableElement;

  @Prop() color: 'primary' | 'secondary';
  @Prop() dense: boolean;
  @Prop() oddEvenStyle: boolean;

  @Event() sort: EventEmitter<Sort>;

  componentDidLoad() {
    this.header = this.host.querySelector('materials-datatable-header');
    Array.from(this.header.querySelectorAll('materials-datatable-header-column')).filter(c => c.sortable).forEach(col => {
      this.sortColsMap.set(col.value, col);
    });
    this.footer = this.host.querySelector('materials-datatable-footer');
    this.rows = Array.from(this.host.querySelectorAll('materials-datatable-body-row'));
    this.updateChildrenProperties();
  }

  @Watch('color')
  @Watch('dense')
  @Watch('oddEvenStyle')
  updateChildrenProperties() {
    if (this.color && this.header) {
      this.header.color = this.color;
    }
    if (this.color && this.footer) {
      this.footer.color = this.color;
    }
    if (this.dense || this.oddEvenStyle) {
      this.rows.forEach((row, index) => {
        if (this.dense) {
          row.dense = true;
        }
        if (this.oddEvenStyle) {
          row.classList.add(index % 2 === 0 ? 'odd' : 'even');
          row.classList.remove(index % 2 === 0 ? 'even' : 'odd');
        }
      });
    }
  }

  @Listen('child:sort')
  listenSort(event: CustomEvent<Sort>) {
    event.stopPropagation();
    this.sortColsMap.forEach(col => {
      col.sorted = col.value === event.detail.columnName;
    });
    this.sort.emit(event.detail);
  }
  render() {
    return (
      <div class="container">
        <slot name="header" />
        <slot name="body" />
        <slot name="footer" />
      </div>
    );
  }
}
