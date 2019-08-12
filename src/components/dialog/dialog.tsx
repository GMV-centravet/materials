import { MDCDialog } from '@material/dialog';
import { Component, Element, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';

import { DialogAction } from './dialog-action';

@Component({
  tag: 'materials-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})


export class Dialog {

  @Element() host: HTMLMaterialsDialogElement;

  dialogEl: any;
  bodyElement: HTMLElement;
  mdcDialog: MDCDialog;

  /** Event emitted when acceptButton is clicked */
  @Event() accept: EventEmitter;
  /** Event emitted when cancelButton is clicked */
  @Event() cancel: EventEmitter;

  /**
   * @deprecated since 1.1.0 : dialog scroll automatically
   */
  @Prop() scrollable: boolean;
  /**
   * @deprecated since 1.1.0 : not used
   */
  @Prop() items: string[] = [];

  /** Set the witdth of the dialog screen */
  @Prop() width: string;
  /** Set the height of the dialog screen */
  @Prop() height: string;
  /** Set the title of the dialog */
  @Prop() dialogTitle = '';
  /** Display a button which execute accept action */
  @Prop() acceptButton: string;
  /** Display a button which execute cancel action */
  @Prop() cancelButton: string;
  /** Display accept button as disabled */
  @Prop() disableAcceptButton: boolean;
  /** Display a close button in the top right of the dialog */
  @Prop() closeButton: boolean;

  /** A list of this dialog actions */
  @Prop() actions: DialogAction[];

  /** The dialog body, it can be an HTMLElement or plain text */
  @Prop() body: string | HTMLElement;

  bodySection: HTMLElement;

  componentDidLoad() {
    this.mdcDialog = new MDCDialog(this.dialogEl);
    this.mdcDialog.listen('MDCDialog:closing', (event: any) => {
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

    this.updateBody();
  }

  @Watch('body')
  watchBody() {
    this.updateBody();
  }

  updateBody() {
    if (this.bodySection && this.body) {
      this.body instanceof HTMLElement ? this.bodySection.appendChild(this.body) : this.bodySection.innerText = this.body;
    }
  }

  /**
   * @deprecated since 1.1.0 : use toggle() instead
   * Open/Close dialog.
   */
  @Method()
  async show() {
    this.toggle();
  }

  /**
   * Open/close dialog
   */
  @Method()
  async toggle() {
    this.mdcDialog.isOpen ? this.close() : this.open();
  }

  /**
   * Returns true if the dialog is open
   */
  @Method()
  async isOpen(): Promise<boolean> {
    return this.mdcDialog.isOpen;
  }

  /**
   * Opens the dialog
   */
  @Method()
  async open() {
    this.mdcDialog.open();
  }

  /**
   * CloseS the dialog
   */
  @Method()
  async close() {
    this.mdcDialog.close();
    this.cancel.emit(false);
  }

  getSectionClass() {
    return {
      'mdc-dialog__content': true
    };
  }

  render() {
    return (
      <aside class="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby={this.dialogTitle} aria-describedby="mdc-dialog-description"
        ref={el => this.dialogEl = el}>
        <div class="mdc-dialog__container">
          <div style={{ 'min-width': this.width + 'px', 'width': this.width + 'px' }} class="mdc-dialog__surface">
            {this.dialogTitle &&
              <h2 id="mdc-dialog-label" class="mdc-dialog__title">
                {this.dialogTitle}
                {this.closeButton && <materials-icon-button class="close-btn" icon="close" onClick={() => this.close()} />}
              </h2>
            }
            <section ref={el => this.bodySection = el} id="mdc-dialog-content" style={{ 'min-height': this.height + 'px', 'height': this.height + 'px' }} class={this.getSectionClass()}>
              <slot name="body" />
            </section>
            {this.actions ?
              <footer class="mdc-dialog__actions">
                {this.actions.map(a => <button type="button" class="mdc-button mdc-dialog__button" title={a.title ? a.title : a.label} onClick={() => { if (a.action) a.action() }} data-mdc-dialog-action={a.role === 'accept' || a.role === 'close' ? a.role : null}>{a.label}</button>)}
              </footer>
              :
              <footer class="mdc-dialog__actions">
                <slot name="third-button" />
                {!!this.cancelButton &&
                  <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">{this.cancelButton}</button>
                }
                {!!this.acceptButton &&
                  <button type="button" disabled={this.disableAcceptButton} class="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">{this.acceptButton}</button>
                }
              </footer>
            }
          </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
      </aside >
    );
  }
}
