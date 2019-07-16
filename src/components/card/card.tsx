import { Component, Element, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'materials-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card {

  @Element() host: HTMLElement;

  @Prop() width = 'auto';
  @Prop() height = 'auto';
  @Prop() maxHeight: string;
  @Prop() elevation = 1;
  @Prop() padding: number;
  @Prop() cardTitle: string;

  @Prop() onAction: Function;

  @State() actionButtons: HTMLMaterialsCardActionElement[] = [];
  @State() actionIcons: HTMLMaterialsCardActionElement[] = [];
  @State() fullBleedAction: boolean = true;

  private mdcCardEl: any;

  componentWillLoad() {
    Array.from(this.host.querySelectorAll('materials-card-action')).forEach((action, _index, array) => {
      if (action.icon) {
        this.actionIcons.push(action);
      } else {
        this.actionButtons.push(action);
      }
      this.fullBleedAction = action.fullBleed;
      if (action.fullBleed && array.length > 1) {
        console.error('You should use only one full bleed action');
        return Promise.reject();
      }
    });
    return Promise.resolve();
  }

  componentDidLoad() {
    if (this.maxHeight) this.mdcCardEl.style.setProperty('max-height', this.maxHeight);
  }
  render() {
    return (
      <div
        ref={elRef => { this.mdcCardEl = elRef; }}
        class={`mdc-card mdc-elevation--z${this.elevation}`}
        style={{ 'height': this.height, 'width': this.width }}>
        {this.onAction ?
          <div class={{ 'mdc-card__primary-action': !!this.onAction }} onClick={() => this.onAction()} tabindex={this.onAction ? '0' : null}>
            <div class="mdc-card__media">
              <div class="mdc-card__media-content">{this.cardTitle}</div>
            </div>
            <slot />
          </div> :

          <div style={{ 'padding': this.padding ? this.padding + 'px' : null }}>
            <slot />
          </div>
        }
        {(this.actionButtons || this.actionIcons) &&
          <div class={{ 'mdc-card__actions': true, 'mdc-card__actions--full-bleed': this.fullBleedAction }}>
            {this.actionButtons && <div class="mdc-card__action-buttons">
              {this.actionButtons.map(action => {
                return (<button onClick={() => action.onAction()} class="mdc-button mdc-card__action mdc-card__action--button">
                  <span class="mdc-button__label">{action.label}</span>
                </button>);
              })}
            </div>}
            {this.actionIcons && <div class="mdc-icons-buttons">
              {this.actionIcons.map(action => {
                return (<button onClick={() => action.onAction()} class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title={action.label}>{action.icon}</button>);
              })}
            </div>}
          </div>
        }
      </div>
    );
  }
}
