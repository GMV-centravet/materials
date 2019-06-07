import { MDCRipple, util } from '@material/ripple';
import { Component, Element, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-step',
  styleUrl: 'step.scss',
  shadow: true
})
export class Step {

  @Element() host: HTMLElement;

  @Prop() status: 'valid' | 'invalid' | 'empty' = 'empty';
  @Prop() stepTitle: string;
  @Prop() index: number;
  @Prop() isLast: boolean;
  @Prop() active = false;
  @Prop() optional: boolean;
  @Prop() editable: boolean;
  @Prop() showButtons: boolean;
  @Prop() confirmationText: string;
  @Prop() summary: string;
  @Prop() noPadding: boolean;
  private header: HTMLElement;
  private body: HTMLElement;


  @Event() stepClick: EventEmitter;
  @Event() previousStep: EventEmitter;
  @Event() submitStep: EventEmitter;
  @Event() submitStepper: EventEmitter;

  componentDidLoad() {
    if (util.supportsCssVariables(window)) {
      MDCRipple.attachTo(this.header);
    }
    const slot: HTMLSlotElement = this.host.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => {
      this.adjustHeight();
    });
    this.adjustHeight();
  }


  getStepClasses() {
    return {
      'step': true,
      'mdc-typography': true,
      'step-editable': this.editable,
      'step-active': this.active,
      'step-valid': this.status === 'valid',
      'step-empty': this.status === 'empty',
      'step-invalid': this.status === 'invalid',
      'step-last': this.isLast,
    };
  }


  getStepIconContent() {
    if (this.status === 'valid') {
      return <materials-icon name="done" color="#fff"></materials-icon>;
    } else {
      return (this.index + 1).toString();
    }
  }

  getStepIconClasses() {
    return {
      'step-icon': true,
      'step-icon-valid': this.status === 'valid',
      'step-icon-invalid': this.status === 'invalid',
    };
  }


  getStepBodyClasses() {
    return {
      'step-body': true,
      'no-padding': this.noPadding,
      'step-body-active': this.active,
    };
  }



  handleClickNext() {
    if (this.status === 'valid') {
      this.submitStep.emit();
    }
  }

  handleClickFinish() {
    if (this.status === 'valid') {
      this.submitStepper.emit();
    }
  }

  handleClickPrevious() {
    this.previousStep.emit();
  }

  @Watch('active')
  @Method()
  async adjustHeight() {
    if (this.body) {
      this.body.style.maxHeight = this.active ? this.body.scrollHeight + 'px' : '0px';
    }
  }

  @Watch('isLast')
  handleLast() {
    if (this.isLast) {
      this.host.classList.add('step-last');
    } else {
      this.host.classList.remove('step-last');
    }
  }

  render() {
    return (
      <div class={this.getStepClasses()}>
        <div ref={el => this.header = el} class="step-header mdc-ripple-surface" onClick={() => this.stepClick.emit(this.index)}>
          <div class={this.getStepIconClasses()}>{this.getStepIconContent()}</div>
          <div class="step-title">{this.stepTitle}
            {this.summary && <span class="step-summary"><br />{this.summary}</span>}
            {!this.summary && this.optional && <span class="step-optional"><br />Optionnel</span>}
          </div>
        </div>
        <div ref={el => this.body = el} class={this.getStepBodyClasses()}>
          <div class="step-content">
            <slot></slot>
          </div>
          {this.showButtons && <div class="step-buttons">
            {this.index > 0 && <materials-button class="previous-button" onClick={() => this.handleClickPrevious()} color="#444">Précédent</materials-button>}
            {this.isLast ?
              <materials-button disabled={this.status !== 'valid' && !this.optional} raised onClick={() => this.handleClickFinish()}>{this.confirmationText ? this.confirmationText : 'Valider'}</materials-button>
              : <materials-button disabled={this.status !== 'valid' && !this.optional} raised onClick={() => this.handleClickNext()}>Suivant</materials-button>}
          </div>}
          {this.confirmationText && !this.showButtons && this.isLast &&
            <materials-button disabled={this.status !== 'valid' && !this.optional} raised onClick={() => this.handleClickFinish()}>{this.confirmationText}</materials-button>
          }
        </div>
      </div>
    );
  }
}
