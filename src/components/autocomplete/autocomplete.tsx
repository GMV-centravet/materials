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
     */
    @Prop({mutable: true, reflectToAttr: true}) value: {display: string, val: string};
    /**
     * For the density of the element
     */
    @Prop() dense: boolean;

    /**
     * Change event emitted when value is selected
     */
    @Event() change: EventEmitter;

    @State() suggestions: Map<string, string>;
    private displayValue: string;

    private menuElement: HTMLMaterialsMenuElement;

    componentDidLoad() {
        this.watchValue();
    }

    @Watch('value')
    watchValue() {
        this.displayValue = this.value ? this.value.display : null;
    }

    selectSuggestion(key: string) {
        if (this.suggestions) {
            this.value = {
                val: key,
                display: this.suggestions.get(key)
            };
        }
        this.menuElement.close();
    }

    execAutocomplete(event: any) {
        this.displayValue = event.target.value;
        this.autocomplete(event.target.value).then((suggests: Map<string, string>) => this.suggestions = suggests);
        this.menuElement.open();
    }

    render() {
        return ([
            <materials-text-field dense={this.dense} value={this.displayValue} onInput={(ev: any) => this.execAutocomplete(ev)} onChange={(ev: Event) => {
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
