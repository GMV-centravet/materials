import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

/**
 * Class that represent a multi-select element
 * composed by a clickable text-field 
 * that opens a dialog with a list of checkboxes
 */
@Component({
  tag: 'materials-multiple-select',
  styleUrl: 'multiple-select.scss',
  shadow: true
})
export class MaterialsMultipleSelect {
  /**
   * Map of options selectable in the dialog
   */
  @Prop() options: Map<string, string>;
  /**
   * Label displayed for the multi-select
   */
  @Prop() label: string;
  /**
   * Title displayed in the dialog
   */
  @Prop() dialogTitle: string;
  /**
   * list of selected elements
   */
  @Prop({ mutable: true, reflectToAttr: true }) value: string[] = [];
  @Element() host: HTMLElement;

  /**
   * Event dispatched when multi-select value changes
   */
  @Event() change: EventEmitter;

  private multiSelectInput: HTMLMaterialsTextFieldElement;
  private multiSelectDialog: HTMLMaterialsDialogElement;

  componentWillLoad() {
    if(!this.value) this.value = [];
  }

  componentWillUpdate() {
    if(!this.value) this.value = [];
  }

  componentDidLoad() {
    this.displayValue();
  }

  componentDidUpdate() {
    this.displayValue();
  }

  /**
   * @param event allows to open dialog when text-field is clicked 
   */
  openMultiSelectDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.multiSelectDialog.dialogTitle = this.dialogTitle;
    this.multiSelectDialog.toggle();
  }

  /**
   * Function called when dialog is accepted
   * emit change event
   * display values selected in text-field
   */
  fillMultiSelectInput() {
    this.displayValue();
    this.change.emit();
  }


  /**
   * Function that displays values selected in the text-field
   */
  displayValue() {
    if (this.value) {
      const selectedValue = this.value.map(val => {
        return this.options.get(val);
      }).join(', ');
      this.multiSelectInput.componentOnReady().then(()=>{
        this.multiSelectInput.value = selectedValue;
        this.multiSelectInput.title = selectedValue;
      })
    }
  }

  /**
   * Function to select or deselect options
   * @param {CustomEvent} event allows to know if options must be selected or deselected
   * @param {string} option to select or deselect
   */
  toggleOption(event: CustomEvent, option: string) {
    event.stopPropagation();
    event.preventDefault();
    if (event.detail) {
        this.value.push(option);
    } else {
        this.value.splice(this.value.indexOf(option), 1);
    }
  }

  render() {
    return ([
      <materials-text-field disabled
        label={this.label}
        overflow
        trailing-icon="search"
        ref={el => this.multiSelectInput = el as HTMLMaterialsTextFieldElement}
        onClick={(event: any) => this.openMultiSelectDialog(event)}></materials-text-field>,
      <materials-dialog
        acceptButton="Sélectionner"
        cancelButton="Annuler"
        close-button
        onAccept={() => this.fillMultiSelectInput()}
        ref={el => this.multiSelectDialog = el as HTMLMaterialsDialogElement}>
        <materials-list slot="body">
          {this.options && Array.from(this.options.keys()).map(opt => {
            return <materials-list-item-checkbox onChange={(event: CustomEvent) => this.toggleOption(event, opt)} checked={this.value && this.value.length > 0 && !!this.value.find(val => opt === val)} label={this.options.get(opt)} value={opt as string | number}></materials-list-item-checkbox>;
          })
          }
        </materials-list>
      </materials-dialog>
    ]);
  }
}
