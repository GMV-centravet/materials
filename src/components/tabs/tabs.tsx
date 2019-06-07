import { MDCTab } from '@material/tab';
import { MDCTabBar } from '@material/tab-bar';
import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'materials-tabs',
  styleUrl: 'tabs.scss',
  shadow: true,
})


export class Tabs {

  @Element()
  private host: HTMLMaterialsTabsElement;

  @Event() tabChange: EventEmitter<number>;

  // @State() private tabs: HTMLMaterialsTabElement[];

  @Prop() color: 'background' | 'primary' | 'secondary' | 'surface' = 'background';

  @Prop() indicatorType: 'underline' | 'icon' = 'underline';

  @Prop() shrinkTabs: boolean;

  @Prop() activeTab: number = 0;

  @State() tabsContent: string[] = [];

  private mdcTabs: MDCTabBar;

  async componentDidLoad() {
    const tabs = Array.from(this.host.querySelectorAll('materials-tab'));
    for (const tab of tabs) {
      await tab.renderHtml().then((content) => this.tabsContent.push(content));
    }
    this.tabsContent = [...this.tabsContent];

  }

  componentDidUpdate() {
    this.mdcTabs = new MDCTabBar(this.host.shadowRoot.querySelector('.mdc-tab-bar'));
    this.mdcTabs.listen('MDCTabBar:activated', (tabs: CustomEvent) => {
      const selectedIndex = tabs.detail.index;
      this.tabChange.emit(selectedIndex);
    });
    this.mdcTabs.activateTab(this.activeTab);
    Array.from(this.host.shadowRoot.querySelectorAll('.mdc-tab')).forEach(tab => MDCTab.attachTo(tab));
  }


  getClasses() {
    return {
      'mdc-tab-bar': true
    }
  }

  render() {
    return (
      <Host class={{
        'materials-tab-background': this.color === 'background',
        'materials-tab-primary': this.color === 'primary',
        'materials-tab-secondary': this.color === 'secondary',
        'materials-tab-surface': this.color === 'surface'
      }}>
        <nav class={this.getClasses()} role="tablist">
          <div class="mdc-tab-scroller">
            <div class="mdc-tab-scroller__scroll-area">
              <div class="mdc-tab-scroller__scroll-content">
                {this.tabsContent.map(tab => tab)}
              </div>
            </div>
          </div>
        </nav>
      </Host>
    );
  }
}
