export default class UserModel {
    constructor (raw) {
        this.raw = raw;
    }

    get getRaw () {
        return this.raw;
    }

    get getID () {
        return this.raw?.id;
    }

    get getRole () {
        return this.raw?.role;
    }

    get isAdmin () {
        return this.raw?.isAdmin ?? false;
    }

    get isPro () {
        return this.raw?.isPro ?? false;
    }

    get getIsActivated () {
        return this.raw?.activated ?? false;
    }

    get getIsEmailValidated () {
        return this.raw?.email_validated ?? false;
    }

    get getFullName () {
        return this.raw?.fullname;
    }

    get getAvatar () {
        return this.raw?.avatar?.location ?? this.raw?.avatarUrl ?? '/images/profile.png';
    }

    get getProfileLink () {
        return this.getUsername ? `/profile/${this.getUsername}` : '/';
    }

    get getProfileEditLink () {
        return this.getUsername ? `/profile/${this.getUsername}/edit` : '/';
    }

    get getFirstname () {
        return this.raw?.firstname;
    }

    get getLastname () {
        return this.raw?.lastname;
    }

    get getUsername () {
        return this.raw?.username;
    }

    get getEmail () {
        return this.raw?.email;
    }

    get getPhone () {
        return this.raw?.phone;
    }

    get getGarage () {
        const garage = this.raw?.garage ?? [];
        return garage.filter(announce => announce.visible);
    }

    get getHiddenGarage () {
        const garage = this.raw?.garage ?? [];
        return garage.filter(announce => !announce.visible);
    }

    get getFavorites () {
        return this.raw?.favorites ?? [];
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
        return this.raw?.about;
    }

    get getCountryLabel () {
        return this.raw?.countrySelect?.value;
    }

    get getAddressParts () {
        const houseNumber = this.raw?.address?.housenumber;
        const street = this.raw?.address?.street;
        const city = this.raw?.address?.city;
        const postalCode = this.raw?.address?.postalcode;
        const country = this.raw?.address?.country;
        const fullAddress = this.raw?.address?.fullAddress;

        return {
            fullAddress,
            houseNumber,
            street,
            city,
            postalCode,
            country,
        };
    }

    addressBuilder (parts) {
        const keys = !Array.isArray(parts) ? [parts] : parts;
        return keys
            .filter(key => this.getAddressParts[key] != null)
            .map(key => this.getAddressParts[key])
            .join(', ');
    }
};
