import dayjs from 'dayjs';

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const yearFromUTC = ({ date = '' }) => (date ? dayjs(date).year() : '');

export const monthFromUTC = ({ date = '' }) => (date ? MONTH_NAMES[dayjs(date).month()] : '');
