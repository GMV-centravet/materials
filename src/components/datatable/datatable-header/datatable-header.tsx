import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-datatable-header',
  styleUrl: 'datatable-header.scss',
  shadow: true
})
export class DatatableHeader {

  @Prop() selectable: boolean;
  @Prop({ mutable: true }) selected: boolean;
  @Prop() color: 'primary' | 'secondary';

  @Event() selectAll: EventEmitter<boolean>;

  /**
   * Capturer le change du checkbox du header
   * @param event
   */
  handleChangeCheckBox(event) {
    this.selectAll.emit(event);
  }

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
