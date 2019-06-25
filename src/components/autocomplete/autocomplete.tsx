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
  @Prop({mutable: true, reflectToAttr: true}) value: {label?: string, value: string};
  /**
  * For the density of the element
  */
  @Prop() dense = false;
  
  /**
  * Change event emitted when value is selected
  */
  @Event() change: EventEmitter;
  
  @State() suggestions: Map<string, string>;
  
  private menuElement: HTMLMaterialsMenuElement;
  
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
    if (this.suggestions) {
      this.value = {
        value: key,
        label: this.suggestions.get(key)
      };
    }
    this.menuElement.close();
  }
  
  execAutocomplete(event: any) {
    this.value.label = event.target.value;
    this.autocomplete(event.target.value).then((suggests: Map<string, string>) => this.suggestions = suggests);
    this.menuElement.open();
  }
  
  render() {
    return ([
      <materials-text-field dense={this.dense} value={this.value.label} onInput={(ev: any) => this.execAutocomplete(ev)} onChange={(ev: Event) => {
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
