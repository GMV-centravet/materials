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

  private mdcDrawer: MDCDrawer;
  @State() items: HTMLMaterialsDrawerListItemElement[];


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
            {this.items.map(item => {
              return <a class={{
                'mdc-list-item': true,
                'mdc-list-item--activated': item.activated
              }} href={item.targetUrl} onClick={(e) => item.press(e)} aria-current="page">
                {item.icon && <i class="material-icons mdc-list-item__graphic" aria-hidden="true">{item.icon}</i>}
                <span class="mdc-list-item__text">{item.label}</span>
              </a>
            })}
          </nav>
        </div>
      </aside>
    ]);
  }
}
