# materials-datatable-action



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                                                                                                                                                   | Type      | Default     |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `color`              | `color`   | The datatable-action color, it can be either : - a predifined value : 'primary', 'secondary', 'error'. - an hexa color code : #225566, #CCC. - a css named color : red, blue. | `string`  | `'primary'` |
| `display`            | `display` | Mark this datatable action as displayed                                                                                                                                       | `boolean` | `true`      |
| `icon`               | `icon`    | Render an icon (from material-icons library)                                                                                                                                  | `string`  | `undefined` |
| `label` _(required)_ | `label`   | The datatable action label                                                                                                                                                    | `string`  | `undefined` |


## Events

| Event   | Description                 | Type               |
| ------- | --------------------------- | ------------------ |
| `press` | Emitted when it get pressed | `CustomEvent<any>` |


## Methods

### `press(e: any) => Promise<void>`

Trigger a press event

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
