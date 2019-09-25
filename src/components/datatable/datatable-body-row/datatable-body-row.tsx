import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-datatable-body-row',
  styleUrl: 'datatable-body-row.scss',
  shadow: true
})
export class DatatableBodyRow {

  @Element() host: HTMLElement;

  /** Set the row as selectable and adds a checkbox at start of row */
  @Prop() selectable: boolean;
  /** Apply low density on the row */
  @Prop() dense: boolean;
  /** Mark the row as selected */
  @Prop({ mutable: true }) selected = false;
  /** Set the row as expandable and adds an icon button to expand content */
  @Prop() expendable: boolean;
  /** Mark the row as expanded */
  @Prop({ mutable: true }) expended: boolean;
  /** Event emitted when row is selected by its checkbox */
  @Event() selectRow: EventEmitter<boolean>;
  /** Event emitted when expand button is clicked */
  @Event() expand: EventEmitter<boolean>;

  @Watch('selected')
  watchSelected() {
    this.selectRow.emit(this.selected);
  }

  handleClick() {
    if (this.selectable) {
      this.selected = !this.selected;
    }
  }

  toggleExpendable(e: Event) {
    e.stopPropagation();
    this.expended = !this.expended;
    this.expand.emit(this.expended);
  }

  render() {
    return <Host class={{
      'dense': this.dense,
      'selectable': this.selectable,
      'selected': this.selected,
      'expended': this.expended
    }} onClick={() => this.handleClick()}>
      <div class="container">
        <div class="mdc-ripple-surface mdc-ripple-surface--primary"></div>
        {this.expendable &&
          <materials-icon-button dense icon={this.expended ? 'arrow_drop_down' : 'arrow_right'} onClick={(e) => this.toggleExpendable(e)} />
        }
        {this.selectable &&
          <materials-checkbox class="selection-checkbox" color="primary"
            onChange={() => {
              this.selected = !this.selected;
            }}
            onClick={(e) => e.stopPropagation()}
            checked={this.selected} />
        }
        <slot />
      </div>
      <div class="expendable-content">
        <slot name="expendable-content" />
      </div>
    </Host>
  }
}
