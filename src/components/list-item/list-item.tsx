import { MDCRipple } from '@material/ripple';
import { Component, Element, h, Prop,Host, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'materials-list-item',
  styleUrl: 'list-item.scss',
  shadow: true
})
export class ListItem {
  @Prop() role: string;
  /**
   * Mark this item as disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * Mark this item as selected.
   */
  @Prop({ reflectToAttr: true,mutable:true }) selected: boolean; 
  /**
   * make the item selectable
   */
  @Prop() selectable = false;  
  @Prop() divider: boolean = false;
  @Prop() itemStartStyle: any;
  @Prop() itemEndStyle: any;
  @Prop() noPadding: boolean;
  /**
   * Prefere le label au <slot /> pour beneficier du textWrap.
   */
  @Prop() label: any;

  /**
   * Coupe le text par defaut.
   */
  @Prop() textWrap: boolean = false;

  /**
   * override la height par defaut du composant list-item.
   */
  @Prop() size: 'medium' | 'small';

  @Element() host: HTMLElement;

  /**
   * click of list-item handler 
   */
  @Event() itemSelected :EventEmitter<void>;

  componentDidLoad() {
    const itemStart = this.host.shadowRoot.querySelector('.mdc-list-item__graphic');
    if (!itemStart.querySelector('slot').assignedNodes().length) {
      itemStart.remove();
    }
    const itemEnd = this.host.shadowRoot.querySelector('.mdc-list-item__meta');
    if (!itemEnd.querySelector('slot').assignedNodes().length) {
      itemEnd.remove();
    }
    MDCRipple.attachTo(this.host.shadowRoot.querySelector('.mdc-list-item'));
  }
  private getClasses() {
    return {
      'mdc-typography': true,
      'mdc-ripple-surface': true,
      'mdc-list-item': true,
      'mdc-list--non-interactive': this.disabled,
      'mdc-list-item--selected': this.selected,
      'mdc-ripple-upgraded': this.selected,
      'mdc-ripple-upgraded--background-focused': this.selected,
      'mdc-list-divider': this.divider,
      'no-padding': this.noPadding
    };
  }

  setHeight() {

    const css = {
      'height': ''
    }
    if (this.size === 'medium') css.height = '36px';
    if (this.size === 'small') css.height = '26px';

    return css;
  }

  handleClick() {
    if(this.selectable){
      this.selected = !this.selected;
      this.itemSelected.emit();
    }
  }

  render() {
    return (
      <Host onClick={()=>this.handleClick()}>
      <li class={this.getClasses()}
        style={this.setHeight()}
        role={this.role}
        tabindex={this.disabled ? -1 : 0}
        aria-disabled={this.disabled}>
        <div class="mdc-list-item__graphic" style={this.itemStartStyle}>
          <slot name="item-start"></slot>
        </div>
        {this.label && <label class={{ 'gmv-label-nowrap': !this.textWrap }} title={this.label}>{this.label}</label>}
        <slot />
        <div class="mdc-list-item__meta" style={this.itemEndStyle}>
          <slot name="item-end"></slot>
        </div>
      </li>
      </Host>
    );
  }
}
