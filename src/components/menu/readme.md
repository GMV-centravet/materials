# materials-menu



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                         | Type      | Default     |
| ----------- | ------------ | --------------------------------------------------- | --------- | ----------- |
| `noPadding` | `no-padding` | Override default CSS mdc-list padding-top & bottom. | `boolean` | `undefined` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `isOpen() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setAnchorMargin(margin: AnchorMargin) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setPosition(position: "TOP_LEFT" | "TOP_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_RIGHT" | "TOP_START" | "TOP_END" | "BOTTOM_START" | "BOTTOM_END") => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [materials-dropdown](..\dropdown)
 - [materials-text-field](..\text-field)

### Graph
```mermaid
graph TD;
  materials-dropdown --> materials-menu
  materials-text-field --> materials-menu
  style materials-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
