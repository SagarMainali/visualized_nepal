const monthsEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsNepali = ["Baisakh", "Jestha", "Ashar", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];

// current format -> 03/16/2024
export const dateFormatter = (date: string, format: 'm/d/y' | 'y-m-d', type: 'AD' | 'BS' = 'AD') => {
    const separator = format.includes('/') ? '/' : '-';

    let monthStr, dayStr, year = '';

    if (format === 'm/d/y') {
        [monthStr, dayStr, year] = date.split(separator);
    } else if (format === 'y-m-d') {
        [year, monthStr, dayStr] = date.split(separator);
    } else {
        throw new Error('Invalid date format!');
    }

    const month = parseInt(monthStr, 10) - 1; //matching with index
    const day = parseInt(dayStr, 10);
    const monthName = type === 'AD' ? monthsEnglish[month] : monthsNepali[month];
    return `${monthName} ${day}, ${year}`;
}

// current format -> 195214
export const priceFormatter = (price: number) => {
    return price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'NPR',
        // minimumFractionDigits: 0,
        // maximumFractionDigits: 0,
    })
}

export const timeIndicator = (time: number | 'max') => {
    return time === 7
        ? 'last 7 days.'
        : time === 30
            ? 'last 30 days.'
            : time === 90
                ? '3 months.'
                : time === 180
                    ? '6 months.'
                    : time === 360
                        ? '1 year.'
                        : 'all time.'
}