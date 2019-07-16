import { MDCDrawer } from '@material/drawer';
import { Component, Element, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'materials-drawer',
  styleUrl: 'drawer.scss',
  shadow: true
})
export class Drawer {

  @Element() host: HTMLMaterialsDrawerElement;

  @Prop() dismissible: boolean;
  @Prop() modal: boolean;

  @State() topAppBar: HTMLMaterialsTopAppBarElement;
  @State() itemsContent: string[] = [];

  private mdcDrawer: MDCDrawer;
  items: HTMLMaterialsDrawerListItemElement[];


  @Method()
  async toggle() {
    this.mdcDrawer.open = !this.mdcDrawer.open;
  }

  @Method()
  async open() {
    this.mdcDrawer.open = true
  }

  @Method()
  async close() {
    this.mdcDrawer.open = false;
  }

  async componentDidLoad() {
    this.items = Array.from(this.host.querySelectorAll('materials-drawer-list-item'));
    for (const item of this.items) {
      await item.renderHtml().then((content) => this.itemsContent.push(content));
    }
    this.itemsContent = [...this.itemsContent];
  }

  componentDidUpdate() {
    this.mdcDrawer = MDCDrawer.attachTo(this.host.shadowRoot.querySelector('.mdc-drawer'));
  }



  private getDrawerClasses() {
    return {
      'mdc-drawer': true,
      'mdc-drawer--dismissible': this.dismissible,
      'mdc-drawer--modal': this.modal,
      'mdc-top-app-bar--fixed-adjust': true
    }
  }

  @Method()
  async renderHtml() {
    return this.render();
  }

  render() {
    return ([
      <aside class={this.getDrawerClasses()}>
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            {this.itemsContent.map(i => {
              return i;
            })}
            {/* <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
              <span class="mdc-list-item__text">Inbox</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
              <span class="mdc-list-item__text">Outgoing</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
              <span class="mdc-list-item__text">Drafts</span>
            </a> */}
          </nav>
        </div>
      </aside>
    ]);
  }
}
