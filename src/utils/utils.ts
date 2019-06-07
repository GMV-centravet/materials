export function getRGBFromHexa(hex: string, transparency?: number) {
  const fixHex = hex.replace('#', '');
  const bigint = parseInt(fixHex, 16);
  return transparency ?
    {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
      a: transparency
    }
    :
    {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
}
export function getRGBAStyle(rgba: { r: number | string, g: number | string, b: number | string, a?: number | string }) {
  return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
}

/*
* From https://trendct.org/2016/01/22/how-to-choose-a-label-color-to-contrast-with-background/
*/
export function getColorBrightness(r: number, g: number, b: number) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function capitalizeFirstLetter(stringChar) {
  return stringChar
    .charAt(0)
    .toUpperCase() + stringChar.slice(1);
}

export function isInDateRange(day, from, to): boolean {
  const check = new Date(day);
  return (check.getTime() <= to.getTime() && check.getTime() >= from.getTime()) ? true : false;
}
// https://codereview.stackexchange.com/questions/184459/getting-the-date-on-yyyymmdd-format
export function yyyymmdd(date: Date): string {
  const x = date;
  const y = x.getFullYear().toString();
  let m = (x.getMonth() + 1).toString();
  let d = x.getDate().toString();
  (d.length === 1) && (d = '0' + d);
  (m.length === 1) && (m = '0' + m);
  const yyyymmdd = y + '-' + m + '-' + d;
  return yyyymmdd;
}
