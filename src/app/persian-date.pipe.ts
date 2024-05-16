import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {
  transform(value: string): string {
    let m = moment(value, 'YYYY-M-D HH:mm:ss');
    let time = m.format('HH:mm:ss');
    let persianDate = m.format('jYYYY/jM/jD');
    if (time !== '00:00:00') {
      persianDate += ' ' + time;
    }
    return persianDate;
  }
}
