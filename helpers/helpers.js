// Shamelessly stolen from here: https://stackoverflow.com/questions/20425771/how-to-replace-1-with-first-2-with-second-3-with-third-etc

var special = [
    'Zeroth',
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Tenth',
    'Eleventh',
    'Twelfth',
    'Thirteenth',
    'Fourteenth',
    'Fifteenth',
    'Sixteenth',
    'Seventeenth',
    'Eighteenth',
    'Nineteenth',
];
var deca = [
    'Twent',
    'Thirt',
    'Fort',
    'Fift',
    'Sixt',
    'Sevent',
    'Eight',
    'Ninet',
];

export function stringifyNumber(n) {
    if (n < 20) return special[n];
    if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth';
    return deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
}

export const peso = Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
});
