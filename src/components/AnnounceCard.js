import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import { PhotoCamera } from '@material-ui/icons'
import { useMediaQuery } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import AnnounceClass from '../class/announce.class'
import { getTimeAgo } from '../libs/utils'

const AnnounceCard = ({ announce }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const ad = new AnnounceClass(announce)

    const CarInfos = () => {
        return(
            <div className="specs auction-box m-b-30 m-t-30">
                <div className="row">
                    <div className="specs-line col-md-6">
                        <span>Année</span>{ad.getManufacturer.year}
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Kilométrage</span>{ad.getMileage} km
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Carburant</span>{ad.geVehicleEngine.gas}
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Boite</span>Manuelle
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Moteur</span>4 cyl.
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Cylindrée</span>{ad.geVehicleEngine.cylinder}
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Puissance</span>34cv
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Carte grise</span>Française
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Localisation</span>France, Saint paul les durances (13115)
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Vendeur</span>Pro
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Visites</span>Oui
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Prix de réserve</span>non
                    </div>
                    <div className="specs-line col-md-6">
                        <span>Livraison</span>Oui en supp.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link href={`/announces/${ad.getSlug}`} prefetch={false}>
            <div className="objava-wrapper cardAd">
                <div className="cardAd_Content">
                    <div className="cardAd_Header">
                        <div className={clsx( isDesktop && 'd-flex')}>
                            <img src={ad.getAuthor.getAvatar} className="img-profile-wrapper" width={80} alt={ad.getTitle} />
                            <div className="cardAd_Title">
                                <h2> { ad.getTitle }
                                    <span> { ad.getSubTitle } </span>
                                </h2>
                                <div className="top-profile-name-btn">
                                    <Link href={ad.getAuthor.getProfileLink} prefetch={false}>
                                        <a className="top-profile-name">
                                            { ad.getAuthor.getFullName }
                                        </a>
                                    </Link>
                                </div>
                                <div className="top-profile-data-wrapper">
                                    <div className="top-profile-location">
                                        <img src="/images/location.png" alt=""/>
                                        { ad.getAuthor.getAddress }
                                    </div>
                                </div>
                            </div>
                            <div className="share"> il y a { getTimeAgo(ad.raw.updatedAt) }
                                <img src="images/share.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="cardAd_Featured">
                        <img src={ad.getFeaturedImg} alt=""/>
                        <div className="moreThumbs">
                            <IconButton>
                                <PhotoCamera/>
                                {ad.getCountImages}
                            </IconButton>
                        </div>
                    </div>
                    <div className="price-stars-wrapper">
                        <div className="icons-profile-wrapper">
                            <div className="icons-star-prof icons-star-current">
                                <img src="images/svg/star.svg" alt=""/>
                                <span>{ad.getCountComments}</span>
                            </div>
                            <a href="#" className="icons-star-prof">
                                <img src="images/svg/comment.svg" alt=""/>
                                <span>{ad.getCountComments}</span>
                            </a>
                        </div>
                        <p className="price-annonce">
                            { ad.getPrice} €TTC
                            <span> {ad.getPriceHT} €HT</span>
                        </p>
                    </div>
                    <CarInfos/>
                    {
                        announce.tags && (
                            <p className="hashes-wrapper">
                                {announce.tags && announce.tags.map(tag => (
                                    <Link href={`/tag/${tag.name}`}>
                                        <span>{tag.name}</span>
                                    </Link>
                                ))}
                            </p>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default AnnounceCard
