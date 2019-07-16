# materials-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                          | Type                | Default     |
| --------------- | --------------- | ---------------------------------------------------- | ------------------- | ----------- |
| `alignLabel`    | `align-label`   | If a label is provided, where should it be aligned ? | `"left" \| "right"` | `'left'`    |
| `checked`       | `checked`       | Mark the checkbox has checked                        | `boolean`           | `false`     |
| `color`         | `color`         |                                                      | `string`            | `'accent'`  |
| `disabled`      | `disabled`      | Mark the checkbox has disabled                       | `boolean`           | `false`     |
| `indeterminate` | `indeterminate` |                                                      | `boolean`           | `false`     |
| `label`         | `label`         | The checkbox label (Optionnal)                       | `string`            | `undefined` |
| `name`          | `name`          |                                                      | `string`            | `undefined` |
| `value`         | `value`         | The checkbox value                                   | `number \| string`  | `undefined` |


## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `change` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [materials-datatable-body-row](../datatable/datatable-body-row)
 - [materials-datatable-header](../datatable/datatable-header)
 - [materials-list-item-checkbox](../list-item-checkbox)

### Graph
```mermaid
graph TD;
  materials-datatable-body-row --> materials-checkbox
  materials-datatable-header --> materials-checkbox
  materials-list-item-checkbox --> materials-checkbox
  style materials-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
