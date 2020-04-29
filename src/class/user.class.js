export default class user {
    constructor (user) {
        this.user = user
    }

    get getFullName () {
        return this.user ? `${this.user.firstname} ${this.user.lastname}` : ''
    }

    get getAvatar () {
        return this.user ? this.user.avatar : 'images/profile.png'
    }

    get getProfileLink () {
        return `/profile/${this.getUserName}`
    }

    get getAddress () {
        return this.user ? this.user.fullAddress : 'Paris 75005, France'
    }

    get getUserName () {
        return this.user && this.user.username
    }

    get getCountFollowers () {
        const count = this.user ? this.user.followers ? this.user.followers.length : 0 : 0;
        return `${count} abonnés`
    }

    get getCountFollowing () {
        const count = this.user ? this.user.followings ? this.user.followings.length : 0 : 0;
        return `${count} abonnements`
    }

    get getDescription () {
        return this.user.about || 'content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes b'
    }
};
