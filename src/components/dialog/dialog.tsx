import { MDCDialog } from '@material/dialog';
import { Component, Element, Event, EventEmitter, h, Method, Prop } from '@stencil/core';

@Component({
  tag: 'materials-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})


export class Dialog {

  @Element() host: HTMLMaterialsDialogElement;

  dialogEl: any;
  bodyElement: HTMLElement;
  MWCDialog: MDCDialog;
  @Event() accept: EventEmitter;
  @Event() cancel: EventEmitter;

  /**
   * @deprecated since 1.1.0 : dialog scroll automatically
   */
  @Prop() scrollable: boolean;
  @Prop() items: string[] = [];
  @Prop() width: string;
  @Prop() height: string;
  @Prop() dialogTitle = '';
  @Prop() acceptButton: string;
  @Prop() cancelButton: string;
  @Prop() disableAcceptButton: boolean;
  @Prop() closeButton: boolean;

  componentDidLoad() {
    this.MWCDialog = new MDCDialog(this.dialogEl);
    this.MWCDialog.listen('MDCDialog:closing', (event: any) => {
      switch (event.detail.action) {
        case 'accept':
          this.accept.emit(true);
          break;
        case 'close':
          this.cancel.emit(false);
          break;
        default:
          this.cancel.emit(false);
          break;
      }
    });
  }

  /**
   * @deprecated since 1.1.0 : use toggle() instead
   * Open/Close dialog.
   */
  @Method()
  async show() {
    this.toggle();
  }

  @Method()
  async toggle() {
    this.MWCDialog.isOpen ? this.close() : this.open();
  }

  @Method()
  async isOpen(): Promise<boolean> {
    return this.MWCDialog.isOpen;
  }

  @Method()
  async open() {
    this.MWCDialog.open();
  }

  @Method()
  async close() {
    this.MWCDialog.close();
    this.cancel.emit(false);
  }

  getSectionClass() {
    return {
      'mdc-dialog__content': true
    };
  }

  render() {
    return (
      <aside id="my-mdc-dialog" class="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby={this.dialogTitle} aria-describedby="mdc-dialog-description"
        ref={el => this.dialogEl = el}>
        <div class="mdc-dialog__container">
          <div style={{ 'min-width': this.width + 'px', 'width': this.width + 'px' }} class="mdc-dialog__surface">
            <h2 id="mdc-dialog-label" class="mdc-dialog__title">
              {this.dialogTitle}
              {this.closeButton && <materials-icon-button class="close-btn" icon="close" onClick={() => this.close()} />}
            </h2>
            <section id="mdc-dialog-content" style={{ 'min-height': this.height + 'px', 'height': this.height + 'px' }} class={this.getSectionClass()}>
              <slot name="body" />
            </section>
            <footer class="mdc-dialog__actions">
              <slot name="third-button" />
              {!!this.cancelButton &&
                <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">{this.cancelButton}</button>
              }
              {!!this.acceptButton &&
                <button type="button" disabled={this.disableAcceptButton} class="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">{this.acceptButton}</button>
              }
            </footer>
          </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
      </aside >
    );
  }
}
