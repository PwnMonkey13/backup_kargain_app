import React from 'react'
import parseISO from 'date-fns/parseISO'
import differenceInHours from "date-fns/differenceInHours"
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInDays from 'date-fns/differenceInDays'
import differenceInMonths from 'date-fns/differenceInMonths'
import differenceInYears from 'date-fns/differenceInYears'

export function getLogo () {
    return '/images/Kargain_logo.png'
}

const dirMap = {
    // greater-than
    gt: { asc: 1, desc: -1 },
    // less-than
    lt: { asc: -1, desc: 1 }
}

const doSort = (A, B, property, direction = 'ASC') => {
    const a = A[property]
    const b = B[property]

    if (a < b) {
        return dirMap.lt[direction.toLowerCase()]
    }
    if (a > b) {
        return dirMap.gt[direction.toLowerCase()]
    }
    return 0
}

export const createSorter = (...args) => {
    if (typeof args[0] === 'string') {
        args = [
            {
                direction: args[1],
                property: args[0]
            }
        ]
    }

    return (A, B) => {
        let ret = 0

        args.some(sorter => {
            const { property, direction = 'ASC' } = sorter
            const value = doSort(A, B, property, direction)

            if (value === 0) {
                // they are equal, continue to next sorter if any
                return false
            } else {
                // they are different, stop at current sorter
                ret = value

                return true
            }
        })

        return ret
    }
}

export const getTimeAgo = (isoTime, labels = { m : "minutes", h : "heures", d : "jours", M : 'mois', y : "années"}) => {
    const date = parseISO(isoTime)
    const hoursAgo = differenceInHours(new Date(), date);
    if(hoursAgo < 1) return [differenceInMinutes(new Date(), date), labels.m].join(' ')
    if(hoursAgo < 24) return [hoursAgo, labels.h].join(' ');
    const daysAgo = differenceInDays(new Date(), date);
    if(daysAgo < 31) return [daysAgo, labels.d].join(' ')
    if(daysAgo < 365) return [differenceInMonths(new Date(), date), labels.M ].join(' ')
    else return [differenceInYears(new Date(), date), labels.y ].join(' ')
}
