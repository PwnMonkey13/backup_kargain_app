import React from 'react'

export function getApiUrl () {
    if (process.env.NODE_ENV === 'production') return 'https://kargainapi.pwnmonkey13.now.sh/'
    else return 'http://localhost:8080/api'
}

export function getLogo () {
    return '/images/Kargain_logo.png'
}

export const setCookie = (cname, cvalue, minutes = 1000) => {
    const d = new Date()
    d.setTime(d.getTime() + (minutes * 60 * 1000))
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
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
