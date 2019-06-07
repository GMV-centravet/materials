import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

/**
 * thanks to  https://github.com/andregoncalves/stencil-timepicker/
 */
@Component({
  tag: 'materials-timepicker',
  shadow: true
})
export class Timepicker {

  @Event() timeSelectedChange: EventEmitter<string>;

  @Prop() timeSelected: string;
  @Prop() step: number = 15;
  @Prop() clock24: boolean = true;

  _getOptions() {
    const start = 0;
    const total = Math.round((60 / this.step) * 24);

    const hours = [];
    for (let i = start; i < total; i++) {
      hours.push(i * this.step);
    }
    return hours;
  }

  _format(h, m) {
    let indicator = '';
    if (!this.clock24 && h >= 12) {
      indicator = 'PM';
      h = h - 12;
    } else {
      if (!this.clock24 && h < 12) {
        indicator = 'AM';
      }
    }

    if (!this.clock24 && h === 0) {
      h = 12;
    }

    if (h < 10) {
      h = `0${h}`;
    }

    if (m < 10) {
      m = `0${m}`;
    }

    if (indicator)
      m = m + ` ${indicator}`;

    return `${h}:${m}`;
  }

  _renderOption(m) {
    const base = new Date(0);
    base.setMinutes(m);
    const hours = base.getUTCHours();
    const minutes = base.getUTCMinutes();
    const formatted = this._format(hours, minutes);

    if (this.timeSelected === formatted)
      return <materials-list-item selected onClick={() => this.timeSelectedChange.emit(formatted)}>{formatted}</materials-list-item>;
    else
      return <materials-list-item onClick={() => this.timeSelectedChange.emit(formatted)}>{formatted}</materials-list-item>;
  }

  render() {
    return this._getOptions().map(e => this._renderOption(e));
  }
}
