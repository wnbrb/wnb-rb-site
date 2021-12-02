import { yearFromUTC } from '../utils/time';

export const meetupsByYear = (meetups = []) =>
    meetups.reduce((acc, meetup) => {
        const year = yearFromUTC(meetup);
        if (acc[year]) {
            acc[year].push(meetup);
        } else {
            acc[year] = [meetup];
        }
        return acc;
    }, {});
