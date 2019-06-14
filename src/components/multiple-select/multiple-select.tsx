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
  @Prop({ mutable: true }) value: string;
  @Element() host: HTMLElement;

  @Event() change: EventEmitter;

  private multiSelectInput: HTMLMaterialsTextFieldElement;
  private multiSelectDialog: HTMLMaterialsDialogElement;
  private selectedOptions: string[] = [];

  componentDidLoad() {
    this.initSelectedOptions();
    this.displayValue();
  }

  componentDidUpdate() {
    this.initSelectedOptions();
    this.displayValue();
  }

  initSelectedOptions() {
    if (this.value) {
      this.selectedOptions = this.value.split(',');
    }
  }

  openMultiSelectDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.multiSelectDialog.dialogTitle = this.dialogTitle;
    this.multiSelectDialog.toggle();
  }

  fillMultiSelectInput() {
    this.displayValue();
    this.value = this.selectedOptions.join(',');
    this.change.emit();
  }


  displayValue() {
    const selectedValue = this.selectedOptions.map(val => this.options.get(val)).join(', ');
    if (selectedValue.length > 22) {
      this.multiSelectInput.value = selectedValue.substring(0, 22) + '...';
      this.multiSelectInput.title = selectedValue;
    } else {
      this.multiSelectInput.value = selectedValue;
      this.multiSelectInput.title = '';
    }
  }

  toggleOption(event: CustomEvent, value: string) {
    event.stopPropagation();
    event.preventDefault();
    if (event.detail) {
      this.selectedOptions.push(value);
    } else {
      this.selectedOptions.splice(this.selectedOptions.indexOf(value), 1);
    }
  }

  private isChecked(value: string): boolean {
    return this.value ? this.value.indexOf(value) > -1 : false;
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
