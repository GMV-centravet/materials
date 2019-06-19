import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'materials-datatable-pagination',
  styleUrl: 'datatable-pagination.scss',
  shadow: true
})
export class DatatablePagination {

  @Prop() size = 0;
  @Prop() total = 0;
  @Prop() currentPage = 0;
  @Prop() first = 0;
  @Prop() last = 0;

  @Event() nextPage: EventEmitter;
  @Event() previousPage: EventEmitter;

  handleNextClick() {
    this.nextPage.emit();
  }

  handlePreviousClick() {
    this.previousPage.emit();
  }

  render() {
    return (
      <div class="container">
        <materials-layout-grid class="pagination">
          <materials-layout-cell class="navigate">
            <materials-icon-button icon="navigate_before" onClick={() => this.handlePreviousClick()}></materials-icon-button>
          </materials-layout-cell>
          <materials-layout-cell class="pages">
            <span> {this.first} - {this.last} sur {this.total}</span>
          </materials-layout-cell>
          <materials-layout-cell class="navigate">
            <materials-icon-button icon="navigate_next" onClick={() => this.handleNextClick()}></materials-icon-button>
          </materials-layout-cell>
        </materials-layout-grid>
      </div>
    );
  }
}
