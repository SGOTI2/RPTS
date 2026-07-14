import { Config } from "./userConfig";
import { dayOf } from "./util";

const units: {
  [unit: string]: number
} = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: 24 * 60 * 60 * 1000 * 365 / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

let rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

export default function LocaleTime(date: Date) {
  const now = new Date();
  let elapsed = date.getTime() - now.getTime();

  for (let u in units) {
    if (Math.abs(elapsed) > units[u] 
        || u == 'second'
        || (u == "day" && Math.abs(elapsed) > units["hour"] && dayOf(now) != dayOf(date) && date.getHours() >= Config.shopOpenHour) // If we're screening to see if we should use day relative, stop and use day relative if... It's due in more than 1hr from now && It's not due today && It's due after the shop opens [tomorrow]
    ) {
      let txt = rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit);
      txt = txt[0].toUpperCase() + txt.slice(1)
      return txt;
    }
  }
}