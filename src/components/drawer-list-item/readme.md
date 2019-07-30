# materials-drawer-list-item



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute    | Description                                  | Type      | Default     |
| -------------------- | ------------ | -------------------------------------------- | --------- | ----------- |
| `activated`          | `activated`  | Mark this drawer item as activated           | `boolean` | `undefined` |
| `icon`               | `icon`       | Render an icon (from material-icons library) | `string`  | `undefined` |
| `label` _(required)_ | `label`      | The drawer item label                        | `string`  | `undefined` |
| `targetUrl`          | `target-url` | render with a href="${targetUrl}"            | `string`  | `undefined` |


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
