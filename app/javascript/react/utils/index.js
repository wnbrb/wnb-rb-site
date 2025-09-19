const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const postedAtString = (createdAtString) => {
    const today = new Date();
    const postedDate = new Date(createdAtString);

    const diff = (+today - +postedDate) / MS_IN_DAY;

    if (diff <= 1) {
        return 'today';
    }

    if (diff < 7) {
        return `${Math.floor(diff)} days ago`;
    }

    if (diff < 30) {
        const weekDiff = Math.floor(diff / 7);
        const weekOrWeeks = weekDiff === 1 ? 'week' : 'weeks';

        return `${weekDiff} ${weekOrWeeks} ago`;
    }

    const monthDiff = Math.floor(diff / 30);
    const monthOrMonths = monthDiff === 1 ? 'month' : 'months';

    return `${monthDiff} ${monthOrMonths} ago`;
};
