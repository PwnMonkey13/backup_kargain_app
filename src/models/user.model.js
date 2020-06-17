export default class UserModel {
    constructor (raw) {
        this.raw = raw
    }

    get getRaw () {
        return this.raw
    }

    get getID () {
        return this.raw?.id
    }

    get getRole() {
        return this.raw?.role
    }

    get isAdmin () {
        return this.raw?.isAdmin ?? false
    }

    get isPro () {
        return this.raw?.isPro ?? false
    }

    get getFullName () {
        return this.raw?.fullname
    }

    get getAvatar () {
        return this.raw?.avatar?.location ?? this.raw?.avatarUrl ?? '/images/profile.png'
    }

    get getProfileLink () {
        return this.getUsername ? `/profile/${this.getUsername}` : ""
    }

    get getFirstname () {
        return this.raw?.firstname
    }

    get getLastname () {
        return this.raw?.lastname
    }

    get getUsername () {
        return this.raw?.username
    }

    get getEmail () {
        return this.raw?.email
    }

    get getPhone () {
        return this.raw?.phone
    }

    get getGarage () {
        return this.raw?.garage ?? []
    }

    get getFavorites () {
        return this.raw?.favorites ?? []
    }

    get getFollowers () {
        return this.raw?.followers ?? [];
    }

    get getCountFollowers () {
        return this.raw?.followers?.length ?? 0;
    }

    get getCountFollowing () {
        return this.raw?.followings?.length ?? 0;
    }

    get getDescription () {
        return this.raw?.about
    }

    get getCountryLabel() {
        return this.raw?.countrySelect?.value
    }

    get getAddressParts () {
        const houseNumber = this.raw?.address?.housenumber
        const street = this.raw?.address?.street;
        const city = this.raw?.address?.city?.name;
        const postCode = this.raw?.address?.city?.postcode;
        const fullAddress = this.raw?.address?.fullAddress
        return {
            fullAddress,
            houseNumber,
            street,
            city,
            postCode,
        };
    }
};
