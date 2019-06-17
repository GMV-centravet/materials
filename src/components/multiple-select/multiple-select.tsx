import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-multiple-select',
  styleUrl: 'multiple-select.scss',
  shadow: true
})
export class MaterialsMultipleSelect {
  @Prop() options: Map<string, string>;
  @Prop() label: string;
  @Prop() dialogTitle: string;
  @Prop({ mutable: true }) value: string[] = [];
  @Element() host: HTMLElement;

  @Event() change: EventEmitter;

  private multiSelectInput: HTMLMaterialsTextFieldElement;
  private multiSelectDialog: HTMLMaterialsDialogElement;
  private selectedOptions: string[] = [];

  componentDidLoad() {
    this.displayValue();
  }

  componentDidUpdate() {
    this.displayValue();
  }

  openMultiSelectDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.multiSelectDialog.title = this.dialogTitle;
    this.multiSelectDialog.toggle();
  }

  fillMultiSelectInput() {
    this.displayValue();
    this.change.emit();
  }


  displayValue() {
    const selectedValue = this.value.map(val => this.options.get(val)).join(', ');
    this.multiSelectInput.value = selectedValue;
    this.multiSelectInput.title = selectedValue;
  }

  toggleOption(event: CustomEvent, option: string) {
    event.stopPropagation();
    event.preventDefault();
    if (event.detail) {
        this.value.push(option);
    } else {
        this.value.splice(this.value.indexOf(option), 1);
    }
  }

  private isChecked(option: string): boolean {
    return this.value.find(val => option === val) !== undefined;
  }

  render() {
    return ([
      <materials-text-field disabled
        label={this.label}
        ref={el => this.multiSelectInput = el as HTMLMaterialsTextFieldElement}
        onClick={(event: any) => this.openMultiSelectDialog(event)}></materials-text-field>,
      <materials-dialog
        acceptButton="Sélectionner"
        cancelButton="Annuler"
        close-button
        onAccept={() => this.fillMultiSelectInput()}
        ref={el => this.multiSelectDialog = el as HTMLMaterialsDialogElement}>
        <materials-list slot="body">
          {this.options && Array.from(this.options.keys()).map(val => {
            return <materials-list-item-checkbox onChange={(event: CustomEvent) => this.toggleOption(event, val)} checked={this.isChecked(val)} label={this.options.get(val)} value={val as string | number}></materials-list-item-checkbox>;
          })
          }
        </materials-list>
      </materials-dialog>
    ]);
  }
}
