import React from 'react'
import { useRouter } from 'next/router'
import AnnounceService from '../../services/AnnounceService'
import AnnounceClass from '../../class/announce.class'

import TitleMUI from '../../components/TitleMUI'

const Announce = ({ announce }) => {
    const router = useRouter()
    const announceClass = new AnnounceClass(announce)
    console.log(announceClass)
    return (
        <article>
            <TitleMUI as="p"><strong>{announceClass.getTitle}</strong></TitleMUI>

            <div className="col-md-12 m-b-50 auction-page-subheader">
                <div className="auction-page-subheader">
                    <p className="lead">
                        <span>Termine dans</span>
                        <span className="m-l-0">2 jours</span>
                    </p>
                    <p className="lead"><span>Meilleure enchère :</span>
                        <span style={{lineHeight: '18px', fontSize: '2rem', fontWeight: 'bold'}}>600 €</span></p>
                </div>
                <div data-vue="" className="col-md-6 auction-page-subheader-buttons">
                    <a href="/about/questions">comment ça marche ?</a>
                    <a href="#new-bid" className="btn btn-hide btn-default-dark js-gotobid">Enchérir</a>
                </div>
            </div>

            <div className="col-md-12 m-b-60">
                <div className="gallery">
                    <div className="gallery-image">
                        <div className="img-src gallery-image-src"
                             data-src="/storage/lead/original/img_5e978a4190b88.jpg"
                             style={{backgroundImage: "url('/storage/lead/original/img_5e978a4190b88.jpg')"}}
                             lazy="loaded">
                        </div>
                        <div className="gallery-thumbs">
                            <a href="#gallery-full" className="gallery-thumbs-image gallery-more js-gotobid">33 +</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-8 p-r-60 mob-p-r-lg">

                <p className="lead auction-desc">
                    Un peu de courage pour restaurer cette 4L qui n'a connu que 2 propriétaires. Après tout, il s'agit
                    peut-être du parfait projet pour terminer le confinement ?&nbsp;
                    <small>L'équipe Benzin</small>
                </p>

                <div className="specs auction-box m-b-30 m-t-30">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="specs-line col-md-6">
                                <span>Année</span>1984
                            </div>
                            <div className="specs-line col-md-6">
                                <span>Kilométrage</span>136.000 km
                            </div>
                            <div className="specs-line col-md-6">
                                <span>Carburant</span>Essence
                            </div>
                            <div className="specs-line col-md-6">
                                <span>Boite</span>Manuelle
                            </div>
                            <div className="specs-line col-md-6">
                                <span>Moteur</span>4 cyl.
                            </div>
                            <div className="specs-line col-md-6">
                                <span>Cylindrée</span>1.1
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
                </div>

                <div className="wysiwyg">
                    <p style={{textAlign: 'justify'}}><strong>Informations Covid-19</strong>&nbsp;: Nos services se
                        poursuivent sans interruption. Il est toujours possible d'acheter et de vendre sur Benzin.
                        Cependant, nous supendons l'envoi de photographes à domicile et vous devrez attendre la fin de
                        la période de confinement pour aller chercher ou pour recevoir votre voiture (dans le cas d'une
                        livraison).</p>

                    <h1 style={{textAlign: 'justify'}}>Présentation</h1>

                    <p style={{textAlign: 'justify'}}>Cette Renault 4L
                    GTL de 1984 d’origine française est une 2ème main affichant 136.000 km. Le vendeur indique que la
                    voiture est à restaurer mais que la mécanique et la boîte de vitesses fonctionnent
                    correctement.&nbsp;</p>

                </div>
            </div>

            <div className="col-md-4 col-sm-4 mob-m-t-50">
                <div className="bids m-b-20">
                    <div className="bids-title m-b-20">Poser une question</div>
                    <div className="profilesmall">
                        <a className="profilesmall-picture link-inherit-block" href="https://benzin.fr/about/contact">
                            <img src="/img/benzin-logo-profile-bl.jpg" alt=""/>
                        </a>

                        <div className="profilesmall-infos">
                            <p>
                                <a href="https://benzin.fr/about/contact" className="link-inherit">Benzin</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bids m-b-20">
                    <p className="bids-title">Newsletter</p>
                    <p className="m-t-10">Un mail par semaine pour ne rien manquer</p>
                    <div className="mj-w-button mj-w-btn" data-token="db532049e30bf40823307b0e13ef48ab">
                        <div className="btn btn-lg btn-block btn-primary m-t-md"
                             style={{backgroundColor: "rgb(24, 131, 204)"}}>
                            ABONNEZ-VOUS
                        </div>
                    </div>
                </div>

            <Spacer top={100}/>
            <TitleMUI>Images</TitleMUI>
            <GalleryViewer images={announce.getFormatedImagesViewer} ref={refImg}/>
            <GalleryImgsLazy images={announce.getUploadedImages} handleCLickImg={handleCLickImg}/>
            <UploadDropZone fireFiles={startUploadImages}/>

Announce.getInitialProps = async function ({ query }) {
    const { slug } = query
    try {
        const announce = await AnnounceService.getAnnounceBySlug(slug)
        return { announce }
    } catch (err) {
        return { err }
    }
}

export default Announce
