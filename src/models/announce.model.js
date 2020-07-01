import UserModel from './user.model';
import parseISO from 'date-fns/parseISO';
import ImageModel from './ImageModel';

export default class AnnounceModel{
    constructor (ad) {
        this.raw = ad;
    }

    //accessors
    get getRaw () {
        return this.raw;
    }

    get getID () {
        return this.raw.id;
    }

    get getAuthor () {
        return new UserModel(this.raw?.user);
    }

    get getSlug () {
        return this.raw?.slug;
    }

    get getAnnounceLink() {
        return this.getSlug ? `/announces/${this.getSlug}` : '/';
    }

    get getAnnounceEditLink () {
        return this.getSlug ? `/announces/${this.getSlug}/edit` : '/';
    }

    get getTitle () {
        return this.raw?.title;
    };

    get getPrice () {
        return this.raw?.price ? Number(this.raw?.price) : 0;
    }

    get getPriceHT () {
        return this.raw?.priceHT ? Number(this.raw?.priceHT) : 0;
    }

    get getManufacturer () {
        const make = this.raw?.manufacturer?.make?.label ?? null;
        const model = this.raw?.manufacturer?.model?.label ?? null;
        const year = this.raw?.manufacturer?.year?.label ?? null;
        const version = this.raw?.manufacturer?.version?.label ?? null;

        return {
            make,
            model,
            year,
            version,
        };
    }

    get getManufacturerFormated () {
        return Object.keys(this.getManufacturer)
            .reduce((carry, key) => {
                const value = this.getManufacturer[key];
                if (value) return [...carry, value];
                return carry;
            }, [])
            .join(' | ');
    }

    get geVehicleEngine () {
        const type = this.raw?.vehicleEngine?.type?.label;
        const gas = this.raw?.vehicleEngine?.gas?.label;
        const cylinder = this.raw?.vehicleEngine?.cylinder;

        return {
            type,
            gas,
            cylinder,
        };
    }

    get getVehiclePower () {
        const ch = this.raw?.power?.ch;
        const kw = this.raw?.power?.kw;

        return {
            ch,
            kw,
        };
    }

    get getVehicleFunction () {
        return this.raw?.vehicleFunction?.label;
    }

    get getVehicleGeneralState () {
        return this.raw?.vehicleGeneralState?.label;
    }

    get getVehicleDoors () {
        return this.raw?.doors?.label;
    }

    get getVehicleSeats () {
        return this.raw?.seats?.label;
    }

    get getVehicleEquipments () {
        return this.raw?.equipments;
    }

    get getVehicleEmissionClass () {
        return this.raw?.emission?.label;
    }

    get getVehicleExternalColor () {
        return this.raw?.externalColor?.label;
    }

    get getVehicleInternalColor () {
        return this.raw?.internalColor?.label;
    }

    get getVehiclePaintColor () {
        return this.raw?.paint?.label;
    }

    get getVehicleMaterials () {
        return this.raw?.materials ?? [];
    }

    get getVehicleCountOwners () {
        return this.raw?.ownersCount?.value;
    }

    get getNationality () {
        return 'FR';
    }

    get getCountryLabel () {
        return this.raw?.countrySelect?.label;
    }

    //allowed : ['houseNumber', 'street', 'city', 'postCode', 'fullAddress', 'country'
    getAdOrAuthorCustomAddress = (queryParts = []) => {
        const adParts = this.getAddressParts;
        const authorParts = this.getAuthor.getAddressParts;
        return queryParts ? queryParts.reduce((carry, part) => {
            const value = (part === 'country') ? this.getCountryLabel : adParts[part] ?? authorParts[part];
            return value ? [...carry, value] : carry;
        }, []).join(' ') : null;
    };

    get getAddressParts () {
        const houseNumber = this.raw?.address?.housenumber;
        const street = this.raw?.address?.street;
        const city = this.raw?.address?.city;
        const postCode = this.raw?.address?.postalcode;
        const fullAddress = this.raw?.address?.fullAddress;

        return {
            houseNumber,
            street,
            city,
            postCode,
            fullAddress,
        };
    }

    get getLocation () {
        const coordinates = this.raw?.location?.coordinates;
        const longitude = coordinates?.[0];
        const latitude = coordinates?.[1];

        return {
            coordinates,
            latitude,
            longitude,
        };
    }

    get getTags () {
        return this.raw?.tags ?? [];
    }

    get getDamagesTabs () {
        return this.raw?.damages ?? [];
    }

    get getCountDamages () {
        return this.getDamagesTabs.reduce((sum, tab) => sum + tab.stages.length, 0);
    }

    get getMileage () {
        return this.raw?.mileage;
    }

    get getLikes () {
        return this.raw?.likes ?? [];
    }

    get getLikesLength () {
        return this.raw?.likes ? this.raw.likes.length : 0;
    }

    get getCountViews () {
        return this.raw?.views ? this.raw?.views.length : 0;
    }

    get getComments () {
        return this.raw?.comments ?? [];
    }

    get getCountComments () {
        return this.getComments ? this.getComments.length : 0;
    }

    get getImages () {
        const images = this.raw?.images ?? [];
        return images.map(image => new ImageModel(image));
    }

    get getCountImages () {
        return this.getImages?.length ?? 0;
    }

    get getFeaturedImg () {
        return this.getImages[0];
    }

    get getCreationDate () {
        const createdAt = this.raw?.createdAt;
        const date = parseISO(createdAt);
        return {
            date,
            raw: createdAt,
            year: date ? date.getFullYear() : null,
            month: date ? date.getMonth() : null,
            day: date ? date.getDate() : null,
        };
    }

    get getDescription () {
        return this.raw?.description;
    }

    get showCellPhone () {
        return this.raw?.showCellPhone;
    }

    get getIsVisible () {
        return this.raw?.visible;
    }

    get getIsActivated () {
        return this.raw?.activated;
    }

    get getActiveStatus () {
        return this.raw?.status;
    }

    //methods

    getTheExcerpt = (len = 200) => {
        const content = this.raw?.content;
        return content ? content.substring(0, len).concat('...') : null;
    };
}
