export default class UploadedImage {
    constructor (ad) {
        this.raw = ad
    }

    get getImageUrl () {
        return this.raw.location
    }

    get getTile () {
        return this.raw.originalName
    }
}
