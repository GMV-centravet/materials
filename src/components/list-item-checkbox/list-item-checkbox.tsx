import { MDCRipple } from '@material/ripple';
import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-list-item-checkbox',
  styleUrl: 'list-item-checkbox.scss',
  shadow: true
})
export class ListItemCheckbox {

  @Prop() disabled: boolean = false;
  @Prop() label: string;
  @Prop({ mutable: true }) checked: boolean;
  @Prop() value: string | number;
  @Prop() color: string;
  @Prop() itemStartStyle: any;
  @Prop() itemEndStyle: any;
  @Prop() noPadding: boolean;
  @Prop() size: HTMLMaterialsListItemElement["size"];
  /**
   * Coupe le text par defaut.
   */
  @Prop() textWrap: boolean = false;

  @Event() change: EventEmitter;

  @Element() host: HTMLElement;

  listItemElement: MDCRipple;
  materialsCheckbox: HTMLMaterialsCheckboxElement;
  checkboxInput: HTMLInputElement;

  componentDidLoad() {
    this.materialsCheckbox = this.host.shadowRoot.querySelector('materials-checkbox');
    this.checkboxInput = this.materialsCheckbox.shadowRoot.querySelector('.mdc-checkbox__native-control');
  }

  toggleCheckbox() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkboxInput.checked = this.checked;
      this.change.emit(this.checked);
    }
  }

  render() {
    return (
      <materials-list-item
        disabled={this.disabled}
        onClick={() => this.toggleCheckbox()}
        itemEndStyle={this.itemEndStyle}
        itemStartStyle={this.itemStartStyle}
        noPadding={this.noPadding}
        size={this.size}
      >
        <materials-checkbox
          slot="item-start"
          id="materials-checkbox"
          color={this.color}
          value={this.value}
          checked={this.checked}
          disabled={this.disabled}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }} />
        <label class={{ 'mdc-typography': true, 'gmv-label-nowrap': !this.textWrap }} title={this.label}>{this.label}</label>
        <div slot="item-start">
          <slot name="item-start" />
        </div>
        <div slot="item-end">
          <slot name="item-end" />
        </div>
      </materials-list-item>
    );
  }
}
