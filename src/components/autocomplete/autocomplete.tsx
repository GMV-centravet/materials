import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
/**
* Class that represent an autocomplete element
* composed by a textfield
* and a menu with selectable items for autocompletion
*/
@Component({
  tag: 'materials-autocomplete',
  styleUrl: 'autocomplete.scss',
  shadow: true
})
export class Autocomplete {
  
  /**
  * Function of autocompletion to pass to the element
  * called during onInput of the text-field
  */
  @Prop() autocomplete: (search: string) => Promise<Map<string, string>>;
  /**
  * Value of the autocomplete text-field
  * composed by a label to be displayed in the text-field
  * and a value that is a real value
  * if no label given, label = value
  */
  @Prop({mutable: true}) value: {label?: string, value: string};
  /**
  * Apply low density on the element
  */
  @Prop() dense = false;
  /**
   * Label of the autocomplete
   */
  @Prop() label: string;
  /**
   * Adds an icon at the end of the text field
   */
  @Prop() trailingIcon: string;
  
  /**
  * Change event emitted when value is selected
  */
  @Event() change: EventEmitter<{label?: string, value: string}>;
  
  @State() suggestions: Map<string, string>;
  
  private menuElement: HTMLMaterialsMenuElement;
  private textElement: HTMLMaterialsTextFieldElement;
  
  componentDidLoad() {
    this.watchValue();
  }

  componentWillLoad() {
    this.watchValue();
  }
  
  @Watch('value')
  watchValue() {
    if (this.value) {
      this.value.label = this.value.label ? this.value.label : this.value.value;
    } else {
      this.value = {
        value: null,
        label: null
      }
    }
  }
  
  selectSuggestion(key: string) {
    this.menuElement.close();
    if (this.suggestions) {
      const newValue = {
        value: key,
        label: this.suggestions.get(key)
      };
      this.value = {...newValue};
    }
    this.change.emit(this.value);
  }
  
  execAutocomplete(event: any) {
    this.value.label = event.target.value;
    this.autocomplete(event.target.value).then((suggests: Map<string, string>) => this.suggestions = suggests);
    this.menuElement.open();
  }

  emptyField() {
    if (!this.textElement.value) {
      this.value = null;
      this.change.emit(this.value);
    }
  }
  
  render() {
    return ([
      <materials-text-field
        trailing-icon={this.trailingIcon}
        dense={this.dense} 
        label={this.label}
        value={this.value.label} 
        onInput={(ev: any) => this.execAutocomplete(ev)} onChange={(ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
          this.change.emit();
        }}></materials-text-field>,
      <materials-menu ref={el => this.menuElement = el as HTMLMaterialsMenuElement}>
      {this.suggestions ? Array.from(this.suggestions.keys()).map((key: string) => <materials-list-item onClick={() => this.selectSuggestion(key)}>{this.suggestions.get(key)}</materials-list-item>) : null}
      </materials-menu>
    ]);
  }
}
