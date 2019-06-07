import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-expansion-panel',
  styleUrl: 'expansion-panel.scss',
  shadow: true
})
export class ExpansionPanel {
  @Element() collapsibleEl;
  @Prop() type: 'accordion' | 'expandable' | 'popout';
  @Prop() elevation = 2;
  @Prop({ mutable: true }) collapsed: boolean = true;
  @Prop() noPadding: boolean;

  private getClasses() {
    const classes = {
      'mdc-base': true,
      'mdc-typography': true,
      'materials-expansion-panel': true,
      'materials-expansion-panel-expanded': !this.collapsed
    };
    classes['mdc-elevation--z' + this.elevation] = true;
    return classes;
  }

  render() {
    return (
      <div class={this.getClasses()}>
        <materials-list-item
          class="materials-expansion-panel-header"
          onClick={() => { this.collapsed = !this.collapsed; }}
          noPadding={this.noPadding}>
          <header class="mdc-typography--subheading2"><slot name="header" /></header>
          <materials-icon slot="item-end" name={this.collapsed ? 'expand_more' : 'expand_less'} />
        </materials-list-item>
        <div class={{ 'materials-expansion-panel-body': true, 'collapsed': this.collapsed }}>
          <div class="collapsible-body">
            <slot name="body" />
          </div>
        </div>
      </div>
    );
  }
}
