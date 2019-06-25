import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-datatable-body-row',
  styleUrl: 'datatable-body-row.scss',
  shadow: true
})
export class DatatableBodyRow {

  @Element() host: HTMLElement;

  @Prop() selectable: boolean;
  @Prop() dense: boolean;
  @Prop({ mutable: true }) selected = false;
  @Prop() expendable: boolean;
  @Prop({ mutable: true }) expended: boolean;

  @Event() selectRow: EventEmitter<boolean>;

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
