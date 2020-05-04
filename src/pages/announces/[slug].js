import React from 'react'
import { useRouter } from 'next/router'
import AnnounceService from '../../services/AnnounceService'
import AnnounceClass from '../../class/announce.class'

import TitleMUI from '../../components/TitleMUI'

    if (!announceRaw) return <Error statusCode={err.statusCode}/>;

    const AnnounceAttributes = () => {
        return (
            <div className="specs auction-box m-b-30 m-t-30">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="specs-line col-md-6">
                            <span>Année</span>{announce.getManufacturer.year}
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Kilométrage</span>1{announce.getMileage}
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Carburant</span>{announce.geVehicleEngine.gas}
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Boite</span>{announce.geVehicleEngine.type}
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Moteur</span>4 cyl. TODO
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Cylindrée</span>{announce.geVehicleEngine.cylinder}
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Puissance</span>34cv
                        </div>
                        <div className="specs-line col-md-6">
                            <span>Carte grise</span>{announce.getNationality}
                        </div>

                        <div className="specs-line col-md-6">
                            <span>Vendeur</span>{announce.getAuthor.isPro}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const startUploadImages = (files) => {
        dispatchModal({ msg: 'Uploading' });
        let data = new FormData();

        //TODO swagger
        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }

        AnnounceService.uploadImages(announce.getSlug, data)
            .then(() => {
                dispatchModal({ msg: 'Upload Successful...' });
                router.reload();
            })
            .catch(err => {
                    console.log(err);
                    dispatchModalError({ err: 'Sorry, something went wrong' });
                },
            );
    };

    const refImg = useRef();

    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index);
            refImg.current.fullScreen();
        }
    };

    return (
        <Container>
            <TitleMUI as="h1" variant="h1"><strong>{announce.getTitle}</strong></TitleMUI>

            <div className={clsx(isDesktop && 'd-flex')}>
                <img src={announce.getAuthor.getAvatar} className="img-profile-wrapper" width={80}
                     alt={announce.getTitle}/>

                <div className="col-md-12 m-b-50 auction-page-subheader">
                    <div className="auction-page-subheader">

                        <Typography variant="h3" component="h2">
                            {announce.getAuthor.getFullName}
                        </Typography>

                        <TitleMUI component="p" variant="h3">
                            <span>Localisation : </span> {announce.getLocation.fullAddress}
                        </TitleMUI>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 m-b-60">
                    <div className="d-flex justify-content-center">
                        <LazyImage
                            placeholder={({ imageProps, ref }) => (
                                <img ref={ref} src="/images/car.png" alt={imageProps.alt}/>)}
                            className="img-full"
                            src={announce.getFeaturedImg}
                            actual={({ imageProps }) => <img {...imageProps} alt={imageProps.alt}/>}
                        />
                    </div>
                </div>
            </div>

            <p className="lead auction-desc">
                {announce.getTopContent}
            </p>

            <AnnounceAttributes/>

            <div className="wysiwyg">
                {announce.getTheContent}
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
