import { Component, Prop, Event, Method } from "@stencil/core";
import { EventEmitter } from "events";

@Component({
    tag: 'materials-datatable-action',
    styleUrl: 'datatable-action.scss',
    shadow: true
})
export class DatatableAction {
    
    /** The datatable action label */
    @Prop() label!: string;
    
    /** Mark this datatable action as displayed */
    @Prop() display: boolean = true;

    /** Render an icon (from material-icons library) */
    @Prop() icon: string;

    /** The datatable-action color, it can be either :
     *  - a predifined value : 'primary', 'secondary', 'error'.
     *  - an hexa color code : #225566, #CCC.
     *  - a css named color : red, blue.
    */
    @Prop() color: 'primary' | 'secondary' | 'error' | string = 'primary';

    /** Emitted when it get pressed */
    @Event({ eventName: 'press' }) pressEvent: EventEmitter;

    /** Trigger a press event */
    @Method()
    async press(e) {
        this.pressEvent.emit(e);
    }

    render() {
        return;
    }
}