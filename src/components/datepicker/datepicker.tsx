import { MDCRipple } from '@material/ripple';
import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

import { capitalizeFirstLetter, isInDateRange } from '../../utils/utils';

@Component({
  tag: 'materials-datepicker',
  styleUrl: 'datepicker.scss',
  shadow: true
})

export class Datepicker {
  @Element() host: HTMLMaterialsDatepickerElement;

  @State() currentMonth: Date = new Date(new Date().setHours(0, 0, 0, 0));

  @Prop() yearPicker = true;
  @Prop() monthPicker = true;
  @Prop() todayPicker = true;
  /**
   * Utilisé pour mettre en surbrillance une période ex: Lundi au dimanche.
   */
  @Prop({ mutable: true }) dateRange: { start: Date, end: Date } = { start: new Date(), end: new Date() };

  @Event() dateSelectedUpdate: EventEmitter<Date>;
  /**
   * Le curseur de la date sélectionée. Sera positioné grace dateSelected.
   */
  @Prop({ mutable: true }) dateSelected: Date = new Date(new Date().setHours(0, 0, 0, 0));

  componentWillLoad() {
    this.dateSelected = this.isValidDate(this.dateSelected);
    this.dateSelectedClick(this.dateSelected);
  }

  componentDidLoad() {
    Array.from(this.host.shadowRoot.querySelectorAll('.mdc-ripple-surface')).forEach((elem) => {
      MDCRipple.attachTo(elem);
    });
  }

  @Watch('dateSelected')
  dateSelectedClick(date: Date, old?) {
    this.currentMonth = new Date(date.setHours(0, 0, 0, 0));
    this.dateSelected = isNaN(Date.parse(date.toString())) ? new Date(new Date().setHours(0, 0, 0, 0)) : date;
    if (isNaN(Date.parse(date.toString()))) return;
    if (date !== old && date !== this.dateSelected) {
      this.dateSelectedUpdate.emit(this.dateSelected);
    }
  }

  isValidDate(d: any): Date {
    const dateParse = Date.parse(d);
    return isNaN(dateParse) ? new Date() : new Date(dateParse);
  }

  addYear(nb: number) {
    const newDate = new Date(this.currentMonth);
    newDate.setFullYear(newDate.getFullYear() + nb);
    this.currentMonth = newDate;
  }
  addMonth(nb: number) {
    // setMonth does not trigger update of the State property, we have to reassign
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth() + nb);
    this.currentMonth = newDate;
  }
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  setToday() {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    this.dateSelected = d;
  }

  startOfWeek(d: Date) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getDaysOfMonth() {
    const days = [];
    let firstDate = new Date(this.currentMonth.getTime());
    firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    firstDate = this.startOfWeek(firstDate);
    days.push(firstDate);
    for (let i = 0; i < 41; i++) { // 41 = 6*7 -1 to get 6 weeks
      const day = new Date(new Date(firstDate.getTime()).setHours(0, 0, 0, 0));
      days.push(this.addDays(day, 1 + i));
    }
    const res = [];
    for (let nbWeek = 0; nbWeek < 6; nbWeek++) {
      res.push(days.slice(nbWeek * 7, nbWeek * 7 + 7));
    }
    return res;
  }

  getClasses(day: Date, index) {
    const classes = {
      'day-overview ': true,
      'mdc-ripple-surface': true,
      'mdc-ripple-surface--primary': true,
      'pointer': true,
      'day-current': this.isCurrentDay(day),
      'day-in-month': (this.isInMonth(day.getDate(), index)),
      'day-selected': (day.getTime() === this.dateSelected.getTime() && !this.isCurrentDay(day)),
      'in-selected-range': isInDateRange(day, this.dateRange.start, this.dateRange.end) && !this.isSameDate(),
    };
    return classes;
  }

  isInMonth(day, week): boolean {
    if (week === 0 && day > 8) { // first row
      return true;
    }
    if (week >= 4 && day < 15) { // last 2 row
      return true;
    }
    return false;
  }

  isCurrentDay(day: Date): boolean {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return day.getTime() === today.getTime();
  }

  isSameDate() {
    return new Date(new Date(this.dateRange.start.setHours(0, 0, 0, 0))).getTime() === new Date(new Date(this.dateRange.end).setHours(0, 0, 0, 0)).getTime();
  }

  render() {
    return (
      <div class="month-navigator mdc-typography">
        {this.yearPicker &&
          <div class="year-picker">
            <materials-icon-button
              dense
              icon="chevron_left"
              title="Année précédente"
              onClick={() => this.addYear(-1)} />
            {capitalizeFirstLetter(this.currentMonth.toLocaleString('fr-fr', { year: 'numeric' }))}
            <materials-icon-button
              dense
              icon="chevron_right"
              title="Année suivant"
              onClick={() => this.addYear(1)} />
          </div>}
        {this.monthPicker &&
          <div class="month-picker">
            <materials-icon-button
              dense
              icon="chevron_left"
              title="Mois précédent"
              onClick={() => this.addMonth(-1)} />
            {capitalizeFirstLetter(this.currentMonth.toLocaleString('fr-fr', { month: 'long', year: this.yearPicker ? undefined : 'numeric' }))
              /**Si yearPicker est a false ont met l'annee a cote du mois */}
            <materials-icon-button
              dense
              icon="chevron_right"
              title="Mois suivant"
              onClick={() => this.addMonth(1)} />
          </div>}
        <div class="week-overview">
          <span class="day-name" title="Lundi">L</span>
          <span class="day-name" title="Mardi">M</span>
          <span class="day-name" title="Mercredi">M</span>
          <span class="day-name" title="Jeudi">J</span>
          <span class="day-name" title="Vendredi">V</span>
          <span class="day-name" title="Samedi">S</span>
          <span class="day-name" title="Dimanche">D</span>
        </div>
        {this
          .getDaysOfMonth()
          .map((week, index) =>
            <div class="week-overview">
              {week.map(day => {
                return (
                  <a class={this.getClasses(day, index)} onClick={() => {
                    this.dateSelectedUpdate.emit(day);
                  }}>
                    <div class={{ 'day-detail': true }}
                      data-datepicker={day.toJSON()}>{day.getDate()}</div>
                  </a>
                );
              })}
            </div>
          )}
        {this.todayPicker &&
          <materials-button
            block dense class="today-picker"
            onClick={() => {
              this.setToday();
              this.dateSelectedUpdate.emit(this.dateSelected);
            }}
            raised>Aujourd'hui</materials-button>}
      </div>
    );
  }
}
