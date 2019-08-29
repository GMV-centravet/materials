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
   * Apply low density on the textfield
   */
  @Prop() dense: boolean;
  /**
   * Adds an icon at the end of the text field
   */
  @Prop() trailingIcon: string;
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
  /**
   * Display selectable elements on many columns according to the max number of elements per columns allowed
   */
  @Prop() maxElementsColumn: number;

  @Element() host: HTMLElement;

  /**
   * Event dispatched when multi-select value changes
   */
  @Event() change: EventEmitter;

  private multiSelectInput: HTMLMaterialsTextFieldElement;
  private multiSelectDialog: HTMLMaterialsDialogElement;
  
  private multiList: Map<number, string[]>;

  componentWillLoad() {
    if(!this.value) this.value = [];
    this.computeMultiList();
  }

  componentWillUpdate() {
    if(!this.value) this.value = [];
    this.computeMultiList();
  }

  computeMultiList() {
    const nbList = this.maxElementsColumn ? (this.options.size / this.maxElementsColumn) + (this.options.size % this.maxElementsColumn) : 0;
    if (nbList > 0) {
      this.multiList = new Map();
      const keys = Array.from(this.options.keys());
      for (let i = 0; i < nbList; i++) {
        const start = i * this.maxElementsColumn;
        const end = (i + 1) * this.maxElementsColumn;
        this.multiList.set(i, keys.slice(start, end < this.options.size ? end : this.options.size))
      }
    } else {
      this.multiList = new Map().set(0, Array.from(this.options.keys()));
    }
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
      <materials-text-field
        focused={!!this.value && this.value.length > 0}
        readonly
        label={this.label}
        overflow
        trailing-icon={this.trailingIcon}
        dense={this.dense}
        ref={el => this.multiSelectInput = el as HTMLMaterialsTextFieldElement}
        onClick={(event: any) => this.openMultiSelectDialog(event)}></materials-text-field>,
      <materials-dialog
        acceptButton="Sélectionner"
        cancelButton="Annuler"
        close-button
        onAccept={() => this.fillMultiSelectInput()}
        ref={el => this.multiSelectDialog = el as HTMLMaterialsDialogElement}>
        <div slot="body" class="body-list">
          {
            this.multiList && Array.from(this.multiList.keys()).map(optKeys => {
              return <materials-list>
                {this.multiList.get(optKeys).map(opt => {
                  return <materials-list-item-checkbox onChange={(event: CustomEvent) => this.toggleOption(event, opt)} checked={this.value && this.value.length > 0 && !!this.value.find(val => opt === val)} label={this.options.get(opt)} value={opt as string | number}></materials-list-item-checkbox>;
                })}
              </materials-list>
            })
          }
        </div>
      </materials-dialog>
    ]);
  }
}
