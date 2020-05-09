export default class User {
    constructor (user) {
        this.raw = user
    }

    get getRawUser () {
        return this.raw
    }

    get isAdmin () {
        return this.raw && this.raw.isAdmin
    }

    get getFullName () {
        return this.raw ? `${this.raw.firstname} ${this.raw.lastname}` : ''
    }

    get getAvatar () {
        return this.raw ? this.raw.avatarUrl : '/images/profile.png'
    }

    get getProfileLink () {
        return `/profile/${this.getUsername}`
    }

    get getAddress () {
        return this.raw ? this.raw.fullAddress : 'Paris 75005, France'
    }

    get getUsername () {
        return this.raw && this.raw.username
    }

    get getCountFollowers () {
        const count = this.raw ? this.raw.followers ? this.raw.followers.length : 0 : 0;
        return `${count} abonnés`
    }

    get getCountFollowing () {
        const count = this.raw ? this.raw.followings ? this.raw.followings.length : 0 : 0;
        return `${count} abonnements`
    }

    get getDescription () {
        return this.raw.about || 'content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes b'
    }
};
