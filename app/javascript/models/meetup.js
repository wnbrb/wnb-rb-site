export const meetupsByYear = (meetups = []) =>
    meetups.reduce((acc, meetup) => {
        const date = new Date(meetup.date);
        const year = date.getFullYear();
        if (acc[year]) {
            acc[year].push(meetup);
        } else {
            acc[year] = [meetup];
        }
        return acc;
    }, {});
