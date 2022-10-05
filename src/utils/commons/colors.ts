/** From https://stackoverflow.com/a/50282399 
 * Takes a 3 or 6-digit hex color code, and an optional 0-255 numeric alpha value
*/
export const hex2rgba = (hex: string, alpha: number) => {
 if (hex[0] !== '#') return undefined;

 const stringValues = (hex.length === 4)
       ? [hex.slice(1, 2), hex.slice(2, 3), hex.slice(3, 4)].map(n => `${n}${n}`)
       : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
 const intValues = stringValues.map(n => parseInt(n, 16));

 return (typeof alpha === 'number')
   ? `rgba(${intValues.join(', ')}, ${alpha})`
   : `rgb(${intValues.join(', ')})`;
}