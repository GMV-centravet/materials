import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-datatable-footer',
  styleUrl: 'datatable-footer.scss',
  shadow: true
})
export class DatatableFooter {

  /** Set the color of the action buttons of the footer */
  @Prop() color: 'primary' | 'secondary';

  @Element() host: HTMLMaterialsDatatableFooterElement;

  private actions: HTMLMaterialsDatatableActionElement[];

  componentWillLoad() {
    this.actions = Array.from(this.host.querySelectorAll('materials-datatable-action'));
  }

  render() {
    return (
      <div class="container">
        {this.actions && this.actions.length > 0 ? this.actions.map(a => {
          return a.display && <materials-button raised color={a.color} icon={a.icon} onClick={(e) => a.press(e)}>{a.label}</materials-button>;
        })
        :
        <slot />
        }
      </div>
    );
  }
}
