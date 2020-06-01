import React from 'react';
import parseISO from 'date-fns/parseISO';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInYears from 'date-fns/differenceInYears';

export function getLogo () {
    return '/images/Kargain_logo.png';
}

const dirMap = {
    // greater-than
    gt: {
        asc: 1,
        desc: -1,
    },
    // less-than
    lt: {
        asc: -1,
        desc: 1,
    },
};

const doSort = (A, B, property, direction = 'ASC') => {
    const a = A[property];
    const b = B[property];

    if (a < b) {
        return dirMap.lt[direction.toLowerCase()];
    }
    if (a > b) {
        return dirMap.gt[direction.toLowerCase()];
    }
    return 0;
};

export const createSorter = (...args) => {
    if (typeof args[0] === 'string') {
        args = [
            {
                direction: args[1],
                property: args[0],
            },
        ];
    }

    return (A, B) => {
        let ret = 0;

        args.some(sorter => {
            const { property, direction = 'ASC' } = sorter;
            const value = doSort(A, B, property, direction);

            if (value === 0) {
                // they are equal, continue to next sorter if any
                return false;
            } else {
                // they are different, stop at current sorter
                ret = value;

                return true;
            }
        });

        return ret;
    };
};

export const getTimeAgo = (isoTime, labels = {
    m: 'minute',
    ms: 'minutes',
    h: 'heure',
    hs: 'heures',
    d: 'jour',
    ds: 'jours',
    M: 'mois',
    y: 'année',
    ys: 'années',
}) => {
    const date = parseISO(isoTime);
    const minutesAgo = differenceInMinutes(new Date(), date);
    if (minutesAgo < 1) return null;
    if (minutesAgo === 1) return [minutesAgo, labels.m].join(' ');
    if (minutesAgo < 60) return [minutesAgo, labels.ms].join(' ');
    const hoursAgo = differenceInHours(new Date(), date);
    if (hoursAgo === 1)return [hoursAgo, labels.h].join(' ');
    if (hoursAgo < 24) return [hoursAgo, labels.hs].join(' ');
    const daysAgo = differenceInDays(new Date(), date);
    if (daysAgo === 1) return [daysAgo, labels.d].join(' ');
    if (daysAgo < 31) return [daysAgo, labels.ds].join(' ');
    const monthsAgo = differenceInMonths(new Date(), date);
    if (monthsAgo < 12) return [monthsAgo, labels.M].join(' ');
    const yearsAgo = differenceInDays(new Date(), date);
    if (yearsAgo === 1) return [yearsAgo, labels.y].join(' ');
    return [differenceInYears(new Date(), date), labels.ys].join(' ');
};
