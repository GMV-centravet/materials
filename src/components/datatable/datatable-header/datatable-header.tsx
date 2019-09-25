import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-datatable-header',
  styleUrl: 'datatable-header.scss',
  shadow: true
})
export class DatatableHeader {

  /** Render checkbox that select all datable content if checked */
  @Prop() selectable: boolean;
  /** Mark header checkbox as selected */
  @Prop({ mutable: true }) selected: boolean;
  /** Set the background color of the header also used for select checkbox */
  @Prop() color: 'primary' | 'secondary';

  /** Event emitted when header checkbox is selected */
  @Event() selectAll: EventEmitter<boolean>;

  @Watch('selected')
  watchSelected() {
    this.selectAll.emit(this.selected);
  }

  /**
   * Définir le checkbox du header
   */
  renderSelectBox() {
    if (this.selectable) {
      return <materials-checkbox color="primary"
        onChange={() => {
          this.selected = !this.selected;
        }}
        onClick={(e) => e.stopPropagation()}
        checked={this.selected}>
      </materials-checkbox>
    }
  }

  private getClasses() {
    return {
      'container': true,
      'container-background-primary': this.color === 'primary',
      'container-background-secondary': this.color === 'secondary',
    }
  }

  render() {
    return (
      <div class={this.getClasses()}>
        {this.renderSelectBox()}
        <slot />
      </div>
    );
  }
}
