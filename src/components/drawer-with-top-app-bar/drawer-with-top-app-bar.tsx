import { MDCDrawer } from '@material/drawer';
import { MDCTopAppBar } from '@material/top-app-bar';
import { Component, Element, h, Prop, State } from '@stencil/core';
import { Host } from '@stencil/core';

@Component({
  tag: 'materials-drawer-with-top-app-bar',
  styleUrl: 'drawer-with-top-app-bar.scss',
  shadow: true
})
export class DrawerWithTopAppBar {

  @Element() host: HTMLMaterialsDrawerWithTopAppBarElement;

  @Prop() drawerType: 'modal' | 'fullHeight' | 'below' = 'fullHeight';
  @Prop() appBarType: 'fixed' | 'prominent' | 'short' | 'short-closed' | 'standard' = 'standard';
  @Prop() appBarDense: boolean;
  @Prop() appBarTitle: string;
  @Prop() open: boolean;

  @State() itemsContent: string[] = [];

  private drawer: MDCDrawer;


  items: HTMLMaterialsDrawerListItemElement[];

  async componentDidLoad() {
    this.items = Array.from(this.host.querySelectorAll('materials-drawer-list-item'));
    for (const item of this.items) {
      await item.renderHtml().then((content) => this.itemsContent.push(content));
    }
    this.itemsContent = [...this.itemsContent];
  }

  componentDidUpdate() {
    if (!this.drawer && this.itemsContent.length > 0) {
      this.drawer = MDCDrawer.attachTo(this.host.shadowRoot.querySelector('.mdc-drawer'));
      this.drawer.open = this.open;
      const topAppBar = MDCTopAppBar.attachTo(this.host.shadowRoot.getElementById('app-bar'));
      if (this.drawerType !== 'modal') {
        topAppBar.setScrollTarget(this.host.shadowRoot.getElementById('main-content'));
      }
      topAppBar.listen('MDCTopAppBar:nav', () => {
        this.drawer.open = !this.drawer.open;
      });
    }
  }

  renderAppBar() {
    const classes = {
      'mdc-top-app-bar': true,
      'mdc-top-app-bar--short': this.appBarType === 'short' || this.appBarType === 'short-closed',
      'mdc-top-app-bar--fixed': this.appBarType === 'fixed',
      'mdc-top-app-bar--prominent': this.appBarType === 'prominent',
      'mdc-top-app-bar--dense': this.appBarDense,
      'mdc-top-app-bar--short-collapsed': this.appBarType === 'short-closed',

    }
    return (
      <header class={classes} id="app-bar">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a class="demo-menu material-icons mdc-top-app-bar__navigation-icon">menu</a>
            <span class="mdc-top-app-bar__title">{this.appBarTitle}</span>
          </section>
        </div>
      </header>
    );
  }

  renderModal() {
    return [
      this.renderAppBar(),
      <aside class="mdc-drawer mdc-drawer--modal">
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            {this.itemsContent.map(i => {
              return i;
            })}
          </nav>
        </div>
      </aside>,
      <div class="mdc-drawer-scrim"></div>,
      <div><slot name="main" /></div>
    ];
  }

  renderFull() {
    return [
      <aside class="mdc-drawer mdc-drawer--dismissible">
        <div class="mdc-drawer__content">
          <div class="mdc-list">
            {this.itemsContent.map(i => {
              return i;
            })}
          </div>
        </div>
      </aside>,

      <div class="mdc-drawer-app-content">
        {this.renderAppBar()}
        <main class="main-content" id="main-content">
          <div class="mdc-top-app-bar--fixed-adjust">
            <slot name="main" />
          </div>
        </main>
      </div>
    ];
  }

  renderBelow() {
    return [
      this.renderAppBar(),
      <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust">
        <div class="mdc-drawer__content">
          <div class="mdc-list">
            {this.itemsContent.map(i => {
              return i;
            })}
          </div>
        </div>
      </aside>,

      <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        <main class="main-content" id="main-content">
          <slot name="main" />
        </main>
      </div>
    ];
  }

  render() {
    switch (this.drawerType) {
      case 'modal':
        return this.renderModal();
      case 'below':
        return <Host class={{ 'materials-drawer--below': true }}>
          {this.renderBelow()}
        </Host>
      case 'fullHeight':
        return this.renderFull();
    }
  }
}
