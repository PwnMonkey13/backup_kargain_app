import React from 'react';
import Link from "next/link";

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

class Announce{
    constructor(ad) {
        this.announce =  ad;
    }

    getTitle(){
        return this.announce.title;
    };

    getSubTitle() {
        return Object.entries(this.manufacturer)
            .filter(([key, val]) => val != null)
            .map(([key, val]) => val.toUpperCase())
            .join(' | ');
    }

    get manufacturer() {
        if (!this.announce.manufacturer) this.announce.manufacturer = {
            make : null,
            model : null,
            year : null,
            version : null
        };
        return {
            make: this.announce.manufacturer.make,
            model: this.announce.manufacturer.model,
            year: this.announce.manufacturer.year,
            version: this.announce.manufacturer.version,
        };
    }

    get slug(){
        return this.announce.slug;
    }

    get author(){
        return new Author(this.announce.user);
    }
}

class Author{
    constructor(author){
        this.author = author;
    }

    getFullName(){
        return this.author ? `${this.author.firstname} ${this.author.lastname}` : "";
    }

    getAvatar(){
        return this.author ? this.author.avatar : 'images/profile.png';
    }

    getAddress(){
        return this.author ? this.author.fullAddress : "Paris 75005, France"
    }

    getUserName(){
        return this.author ? `@${this.author.username}` : '';
    }

    getCountFollowers(){
        const count = this.author ? this.author.followersCount : 100;
        return `${count} abonnés`;
    }

    getCountFollowing(){
        const count = this.author ? this.author.followingCount : 100;
        return `${count} abonnements`;
    }
}

const AnnounceCard = ({announce : ad}) => {
    const announce = new Announce(ad);

    const Legacy = () => {
        return (
            <div className="objava-wrapper">
                <div className="top-profile-wrapper">
                    <a href="#">
                        <img src={announce.author.getAvatar()} alt="" className="img-profile-wrapper"/>
                    </a>
                    <div className="top-profile-content-wrapper-pre">
                        <div className="top-profile-content-wrapper">
                            <h2> { announce.getTitle() } <span> { announce.getSubTitle() }  </span></h2>
                            <div className="top-profile-name-btn">
                                <Link href={`/user`}>
                                    <a className="top-profile-name">
                                        { announce.author.getFullName() }
                                    </a>
                                </Link>
                            </div>
                            <div className="top-profile-data-wrapper">
                                <a href="#" className="top-profile-location">
                                    <img src="/images/location.png" alt=""/>
                                    { announce.author.getAddress() }
                                </a>
                            </div>
                        </div>
                        <div className="share"> il y a 6 heures
                            <img src="images/share.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="annonce-slider3">
                    <div>
                        <a href="#"><img src="images/slider1.png" alt=""/></a>
                    </div>
                </div>
                <div className="price-stars-wrapper">
                    <div className="icons-profile-wrapper">
                        <div className="icons-star-prof icons-star-current">
                            <img src="images/star.svg" alt=""/>
                            <span>15</span>
                        </div>
                        <a href="#" className="icons-star-prof">
                            <img src="images/comment.svg" alt=""/>
                            <span>7</span>
                        </a>
                        <a href="#" className="icons-star-prof icons-star-prof-convert">
                            <img src="images/convert.svg" alt=""/>
                        </a>
                    </div>
                    <p className="price-annonce">20 000 €TTC <span>16 000 €HT</span></p>
                </div>
                <p className="hashes-wrapper">
                    <a href="#">#hashtag</a>
                    <a href="#">#hashtag</a>
                </p>
                <div className="questions-prof-wrapper">
                    <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                </div>
                <form action="#">
                    <textarea className="add-comment" placeholder="Ajouter un commentaire..."/>
                </form>
                <Link href={`/announces/${announce.slug}`}>
                    <a className="btn btn-primary btn-publier">Plus d’infos</a>
                </Link>
            </div>
        );
    };

    return(
        <div className="announce">
            <Legacy/>
        </div>
    )
};

export default AnnounceCard;
