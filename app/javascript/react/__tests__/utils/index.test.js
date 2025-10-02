import { postedAtString } from '../../utils/index';

const setDaysAgo = (date, days) => {
    date.setDate(date.getDate() - days);
};

describe('postedAtString', () => {
    it('should return "today" if date is less than a day ago', () => {
        const today = new Date().toISOString();
        expect(postedAtString(today)).toBe('today');
    });

    it('should return "2 days ago" if date is 2 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 2);

        expect(postedAtString(date.toISOString())).toBe('2 days ago');
    });

    it('should return "1 week ago" if date is 7 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 7);

        expect(postedAtString(date.toISOString())).toBe('1 week ago');
    });

    it('should return "2 week ago" if date is 14 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 14);

        expect(postedAtString(date.toISOString())).toBe('2 weeks ago');
    });

    it('should return "3 weeks ago" if date is 21 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 21);

        expect(postedAtString(date.toISOString())).toBe('3 weeks ago');
    });

    it('should return "4 weeks ago" if date is 28 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 28);

        expect(postedAtString(date.toISOString())).toBe('4 weeks ago');
    });

    it('should return "1 month ago" if date is 30 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 30);

        expect(postedAtString(date.toISOString())).toBe('1 month ago');
    });

    it('should return "2 months ago" if date is 60 days ago', () => {
        const date = new Date();
        setDaysAgo(date, 60);

        expect(postedAtString(date.toISOString())).toBe('2 months ago');
    });
});
