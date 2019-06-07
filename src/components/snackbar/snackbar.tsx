import { MDCSnackbar } from '@material/snackbar';
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'materials-snackbar',
  styleUrl: 'snackbar.scss',
  shadow: true
})
export class Snackbar {
  private snackbarEl: HTMLElement;
  private mdcSnackbar: MDCSnackbar;

  @Prop() label: string;
  @Prop() stacked: boolean;
  @Prop() leading: boolean;
  @Prop() dismissButton: boolean;
  @Prop() actionText?: string;
  @Prop() timeout = 4000;
  @Prop() actionHandler?: Function;

  @Event() close: EventEmitter;


  componentDidLoad() {
    this.mdcSnackbar = new MDCSnackbar(this.snackbarEl);
    this.mdcSnackbar.labelText = this.label;
    this.mdcSnackbar.timeoutMs = this.timeout;
    this.mdcSnackbar.open();
    this.mdcSnackbar.listen('MDCSnackbar:closed', (ev) => this.handleClose(ev));
  }

  handleClose(event) {
    this.close.emit(null);
    if (this.actionHandler && 'action' === event.detail.reason) {
      this.actionHandler();
    }
  }

  getClasses() {
    return {
      'mdc-snackbar': true,
      'mdc-snackbar--stacked': this.stacked,
      'mdc-snackbar--leading': this.leading
    }
  }

  render() {
    return (
      <div class={this.getClasses()} ref={snackbar => this.snackbarEl = snackbar}>
        <div class="mdc-snackbar__surface">
          <div class="mdc-snackbar__label"
            role="status"
            aria-live="polite">
          </div>
          <div class="mdc-snackbar__actions">
            {this.actionText && <button type="button" class="mdc-button mdc-snackbar__action">{this.actionText}</button>}
            {this.dismissButton && <button type="button" class="mdc-icon-button mdc-snackbar__dismiss material-icons" title="Fermer">close</button>}
          </div>
        </div>
      </div>
    );
  }
}
