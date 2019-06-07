import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';


@Component({
  tag: 'materials-radio-group',
  styleUrl: 'radio-group.scss',
  shadow: true
})

export class RadioGroup {
  private MWCRadioNodes: HTMLMaterialsRadioElement[];
  @Element() host: HTMLElement;
  @Event() change: EventEmitter;
  @Prop() name: string;
  @Prop() linebreak: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) value: any;
  @Prop() label: string;

  componentDidLoad() {
    const isRadioChecked: HTMLMaterialsRadioElement = this.host.querySelector('materials-radio[checked]');
    this.value = isRadioChecked ? isRadioChecked.value : null;
    this.MWCRadioNodes = Array.from(this.host.querySelectorAll('materials-radio'));
    this.MWCRadioNodes.forEach((radioEl: Node) => {
      radioEl.addEventListener('change', (value: CustomEvent) => this.handleEvent(value));
    });
  }

  handleEvent(event: CustomEvent) {
    event.stopPropagation();
    this.value = event.detail;
    this.cleanNeighbors(this.value);
    this.change.emit(this.value);
  }

  private cleanNeighbors(except?) {
    this.MWCRadioNodes.filter(el => !except || el.value !== except).forEach(el => el.checked = false);
  }


  render() {
    return (
      <Host class={{ 'linebreak': this.linebreak }}>
        {this.label && <span>{this.label}</span>}
        <slot />
      </Host>
    );
  }
}
