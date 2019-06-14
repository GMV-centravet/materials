# materials-multiple-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                  | Default     |
| ------------- | -------------- | ----------- | --------------------- | ----------- |
| `dialogTitle` | `dialog-title` |             | `string`              | `undefined` |
| `label`       | `label`        |             | `string`              | `undefined` |
| `options`     | --             |             | `Map<string, string>` | `undefined` |
| `value`       | `value`        |             | `string`              | `undefined` |


## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `change` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [materials-text-field](..\text-field)
- [materials-dialog](..\dialog)
- [materials-list](..\list)
- [materials-list-item-checkbox](..\list-item-checkbox)

### Graph
```mermaid
graph TD;
  materials-multiple-select --> materials-text-field
  materials-multiple-select --> materials-dialog
  materials-multiple-select --> materials-list
  materials-multiple-select --> materials-list-item-checkbox
  materials-text-field --> materials-menu
  materials-text-field --> materials-card
  materials-text-field --> materials-datepicker
  materials-text-field --> materials-timepicker
  materials-datepicker --> materials-icon-button
  materials-datepicker --> materials-button
  materials-timepicker --> materials-list-item
  materials-dialog --> materials-icon-button
  materials-list-item-checkbox --> materials-list-item
  materials-list-item-checkbox --> materials-checkbox
  style materials-multiple-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
