import { MDCLinearProgress } from '@material/linear-progress';
import { Component, h, Method, Prop } from '@stencil/core';

@Component({
  tag: 'materials-linear-progress',
  styleUrl: 'linear-progress.scss',
  shadow: true,
})

export class LinearProgress {
  @Prop() indeterminate: boolean;
  @Prop({ mutable: true }) opened: boolean;
  @Prop() backgroundColor: string = '#00e676'; // default color
  @Prop({ mutable: true }) timeout: number; // timeout in ms

  linearEl: HTMLElement;
  mdcLinearProgressEl: MDCLinearProgress;
  @Method()
  async show() {
    return this.opened ? this.close() : this.open();
  }
  @Method()
  async close() {
    this.mdcLinearProgressEl.close();
    this.opened = false;
  }

  @Method()
  async open() {
    this.mdcLinearProgressEl.open();
    this.opened = true;
  }

  componentDidLoad() {
    this.mdcLinearProgressEl = new MDCLinearProgress(this.linearEl);
    if (this.timeout && this.timeout > 0) {
      this.open();
      setTimeout(() => this.close(), this.timeout);
    }
  }

  componentWillUpdate() {
    if (this.timeout > 0) {
      this.open();
      setTimeout(() => { this.close(); this.timeout = 0; }, this.timeout);
    }
  }
  getClasses() {
    return {
      'mdc-linear-progress': true,
      'mdc-linear-progress--closed': !this.opened,
      'mdc-linear-progress--indeterminate': this.indeterminate,

    };
  }
  render() {
    return (
      <div role="progressbar" class={this.getClasses()} ref={el => this.linearEl = el}>
        <div class="mdc-linear-progress__buffering-dots"></div>
        <div class="mdc-linear-progress__buffer"></div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span class="mdc-linear-progress__bar-inner" style={{ 'background-color': this.backgroundColor }}></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner" style={{ 'background-color': this.backgroundColor }}></span>
        </div>
      </div>
    );
  }
}
