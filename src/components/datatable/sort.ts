export class Sort {
  columnName : string;
  sortDirection : SortDirection;

  constructor(columnName : string, sortDirection : SortDirection){
    this.columnName = columnName;
    this.sortDirection = sortDirection;
  }
}

export enum SortDirection{
  ASC = "ASC",
  DESC = "DESC"
}
