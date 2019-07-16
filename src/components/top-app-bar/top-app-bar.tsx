import { MDCTopAppBar } from '@material/top-app-bar';
import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-top-app-bar',
  styleUrl: 'top-app-bar.scss',
  shadow: true
})
export class TopAppBar {

  @Element() host: HTMLMaterialsTopAppBarElement;

  @Prop() barTitle: string;
  @Prop() dense: boolean;
  @Prop() prominent: boolean;
  @Prop() fixed: boolean;
  @Prop() short: boolean;


  @Event() toggleMenu: EventEmitter<void>;

  private topAppBarElement: HTMLElement;

  private actions: HTMLMaterialsTopAppBarActionElement[];

  componentWillLoad() {
    this.actions = Array.from(this.host.querySelectorAll('materials-top-app-bar-action'));
  }

  componentDidLoad() {

    this.topAppBarElement = this.host.querySelector('.mdc-top-app-bar');
    const topAppBar = MDCTopAppBar.attachTo(this.topAppBarElement);
    topAppBar.listen('MDCTopAppBar:nav', () => {
      this.toggleMenu.emit();
    });
  }

  private getTopAppBarClasses() {
    return {
      'mdc-top-app-bar': true,
      'mdc-top-app-bar--fixed': this.fixed,
      'mdc-top-app-bar--prominent': this.prominent,
      'mdc-top-app-bar--dense': this.dense,
      'mdc-top-app-bar--short': this.short,
    }
  }

  render() {
    return <header class={this.getTopAppBarClasses()}>
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <a class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
          <span class="mdc-top-app-bar__title">{this.barTitle}</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          {this.actions.map(a =>
            <a href="#" class={{ 'material-icons': !!a.icon, 'mdc-top-app-bar__action-item': true }} aria-label={a.actionTitle} title={a.actionTitle}>{a.label}</a>
          )}
        </section>
      </div>
    </header >;
  }
}
