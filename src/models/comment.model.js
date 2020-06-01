import User from './user.model';
import parseISO from "date-fns/parseISO";
import differenceInDays from "date-fns/differenceInDays";

export default class Comment {
    constructor (comment) {
        this.raw = comment
    }

    get getRaw () {
        return this.raw
    }

    get getID () {
        return this.raw.id
    }

    get getAuthor () {
        const user = this.raw.user
        return new User(user)
    }

    get getPostDays () {
        if(!this.raw.createdAt) return
        const date = parseISO(this.raw.createdAt)
        return differenceInDays(date, new Date())
    }

    get getMessage () {
        return this.raw.message
    }

    get getResponses () {
        return this.raw.responses || []
    }

    get getLikes () {
        return this.raw.likes || []
    }
}
