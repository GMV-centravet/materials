import { Component, h, Method, Prop } from '@stencil/core';


@Component({
  tag: 'materials-tab',
  styleUrl: 'tab.scss',
  shadow: true
})

export class Tab {

  @Prop() active: boolean;

  @Prop() icon: string;

  @Prop() label: string;

  @Prop() indicatorType: 'underline' | 'icon' = 'underline';

  @Prop() minWidth: boolean;


  getIndicatorClasses() {
    return {
      'mdc-tab-indicator__content': true,
      'mdc-tab-indicator__content--icon': this.indicatorType === 'icon',
      'mdc-tab-indicator__content--underline': this.indicatorType === 'underline',
      'material-icons': this.indicatorType === 'icon'
    }
  }

  getTabClasses() {
    return {
      'mdc-tab': true,
      'mdc-tab--active': this.active,
      'mdc-tab--min-width': this.minWidth
    }
  }

  @Method()
  async renderHtml() {
    return Promise.resolve(
      <button class={this.getTabClasses()} role="tab" aria-selected="true" tabindex={this.active ? '0' : '-1'}>
        <span class="mdc-tab__content">
          {this.icon && <span class="mdc-tab__icon material-icons" aria-hidden="true">{this.icon}</span>}
          <span class="mdc-tab__text-label">
            {this.label ? this.label : <slot />}
          </span>
        </span>
        <span class={{ 'mdc-tab-indicator': true, 'mdc-tab-indicator--active': this.active }}>
          <span class={this.getIndicatorClasses()}>
            {this.indicatorType === 'icon' && 'star'}
          </span>
        </span>
        <span class="mdc-tab__ripple"></span>
      </button>
    );
  }

  render() {
    return;
  }
}
