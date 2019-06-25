# materials-datepicker



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                            | Type                          | Default                                     |
| -------------- | -------------- | ---------------------------------------------------------------------- | ----------------------------- | ------------------------------------------- |
| `dateRange`    | --             | Utilisé pour mettre en surbrillance une période ex: Lundi au dimanche. | `{ start: Date; end: Date; }` | `{ start: new Date(), end: new Date() }`    |
| `dateSelected` | --             | Le curseur de la date sélectionée. Sera positioné grace dateSelected.  | `Date`                        | `new Date(new Date().setHours(0, 0, 0, 0))` |
| `monthPicker`  | `month-picker` |                                                                        | `boolean`                     | `true`                                      |
| `nullable`     | `nullable`     |                                                                        | `boolean`                     | `false`                                     |
| `todayPicker`  | `today-picker` |                                                                        | `boolean`                     | `true`                                      |
| `yearPicker`   | `year-picker`  |                                                                        | `boolean`                     | `true`                                      |


## Events

| Event                | Description | Type                |
| -------------------- | ----------- | ------------------- |
| `dateSelectedUpdate` |             | `CustomEvent<Date>` |


## Dependencies

### Used by

 - [materials-date-field](../date-field)

### Depends on

- [materials-icon-button](../icon-button)
- [materials-button](../button)

### Graph
```mermaid
graph TD;
  materials-datepicker --> materials-icon-button
  materials-datepicker --> materials-button
  materials-date-field --> materials-datepicker
  style materials-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
