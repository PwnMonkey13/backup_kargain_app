import User from './user.class'
import parseISO from 'date-fns/parseISO'
import differenceInDays from 'date-fns/differenceInDays'

export default class Announce {
    constructor (ad) {
        this.raw = ad
    }

    //accessors
    get getRawAnnounce () {
        return this.raw
    }

    get getAuthor () {
        return new User(this.raw.user)
    }

    get getSlug () {
        return this.raw.slug
    }

    get getTitle () {
        return this.raw.title
    };

    get getSubTitle () {
        return this.raw.manufacturer && Object.entries(this.raw.manufacturer)
            .filter(([key, item]) => item != null)
            .map(([key, item]) => typeof item === 'object' ? item.value.toUpperCase() : item.toUpperCase())
            .join(' | ')
    }

    get getPrice () {
        return this.raw.price || '20000€'
    }

    get getPriceHT () {
        return this.raw.priceHT || '19000€'
    }

    get getManufacturer () {
        if (!this.raw.manufacturer) {
            this.raw.manufacturer = {
                make: null,
                model: null,
                year: null,
                version: null
            }
        }
        return {
            make: this.raw.manufacturer.make,
            model: this.raw.manufacturer.model,
            year: this.raw.manufacturer.year,
            version: this.raw.manufacturer.version
        }
    }

    get geVehicleEngine () {
        const type = this.raw.manufacturer.type || {};
        const gas = this.raw.manufacturer.gas || {};
        const cylinder = this.raw.manufacturer.cylinder || {};

        return {
            type: type.value,
            gas: gas.value,
            cylinder: cylinder.value,
        }
    }

    get getMileage () {
        return this.raw.mileage
    }

    get getCountStars () {
        return this.raw.stars ? this.raw.stars.length : 0
    }

    get getCountViews () {
        return this.raw.views ? this.raw.views.length : 0
    }

    get getCountComments () {
        return this.raw.comments ? this.raw.comments.length : 0
    }

    get getCountImages () {
        return this.raw.images ? this.raw.images.length : 1
    }

    get getFeaturedImg () {
        return this.raw.featured_img || '/images/slider1.png'
    }

    get getExpirationDaysLeft () {
        if(!this.raw.expirationDate) return
        const date = parseISO(this.raw.expirationDate)
        return differenceInDays(date, new Date())
    }

    get getTheContent () {
        return this.raw.content
    }

    //methods
    getTheExcerpt = (len=200) => {
        return this.raw.content ? this.raw.content.substring(0, len).concat('...') : null
    }
}
