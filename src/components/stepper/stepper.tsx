import { Component, Element, h, Listen, Method, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'materials-stepper',
  styleUrl: 'stepper.scss',
  shadow: true
})
export class Stepper {

  @Element() host: HTMLElement;

  currentStep: HTMLMaterialsStepElement;

  @Prop() showButtons: boolean;

  @Prop({ mutable: true }) activeStep = 0;

  @Prop() inactiveSteps: number[] = [];

  componentDidLoad() {
    Array.from(this.host.querySelectorAll('materials-step')).forEach(step => {
      if (!step.showButtons) {
        step.showButtons = this.showButtons;
      }
    });
    this.calcIndexes();
  }

  @Method()
  @Watch('inactiveSteps')
  async calcIndexes() {
    const activeSteps = Array.from(this.host.querySelectorAll('materials-step')).filter((_val, index) => this.inactiveSteps.indexOf(index) < 0);
    activeSteps.forEach((step, index) => {
      step.style.display = 'flex';
      step.index = index;
      step.active = (index === 0);
      if (step.index === (activeSteps.length - 1)) {
        step.isLast = true;
      }
    });

    const inactiveSteps = Array.from(this.host.querySelectorAll('materials-step')).filter((_val, index) => this.inactiveSteps.indexOf(index) > -1);
    inactiveSteps.forEach(step => step.style.display = 'none');
    this.adjustHeight();
  }

  @Watch('activeStep')
  async handleActiveStepUpdate() {
    const steps = Array.from(this.host.querySelectorAll('materials-step')).filter((_val, index) => this.inactiveSteps.indexOf(index) < 0);
    steps.forEach((step) => {
      if (step.index === this.activeStep) {
        this.currentStep = step;
      }
      step.active = (step.index === this.activeStep);
    });
  }

  @Listen('stepClick')
  switchStep(ev) {
    // On peut se rendre sur un step si tous les steps précédent sont valides ou optionels
    const steps = Array.from(this.host.querySelectorAll('materials-step')).filter((_val, index) => this.inactiveSteps.indexOf(index) < 0);
    const invalidPrevious = steps.find(e => !(e.status === 'valid' || e.optional) && e.index < ev.detail);
    if (!invalidPrevious) {
      this.activeStep = ev.detail;
    }
  }

  @Method()
  async openStep(index: number) {
    this.activeStep = index;
  }

  @Listen('submitStep')
  @Method()
  async nextStep() {
    const steps = Array.from(this.host.querySelectorAll('materials-step')).filter((_val, index) => this.inactiveSteps.indexOf(index) < 0);
    if (this.activeStep < (steps.length - 1)) {
      this.activeStep++;
    }
  }

  @Listen('previousStep')
  @Method()
  async previousStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  @Method()
  async adjustHeight() {
    const steps = Array.from(this.host.querySelectorAll('materials-step'));
    if (steps) {
      steps.forEach((step) => {
        step.adjustHeight();
      });
    }
  }

  render() {
    return (
      <slot></slot>
    );
  }
}
