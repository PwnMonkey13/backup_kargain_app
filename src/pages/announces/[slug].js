import React, { useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container } from 'reactstrap';
import clsx from 'clsx';
import { LazyImage } from 'react-lazy-images';
import { useMediaQuery } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import AnnounceService from '../../services/AnnounceService';
import AnnounceClass from '../../class/announce.class';
import Spacer from '../../components/Spacer';
import TitleMUI from '../../components/TitleMUI';
import UploadDropZone from '../../components/UploadDropZone';
import GoogleMapStatic from '../../components/GoogleMapStatic';
import GalleryViewer from '../../components/Gallery/GalleryViewer';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import GalleryImgsLazy from '../../components/Gallery/GalleryImgsLazy';
import DamageViewerTabs from '../../components/Damages/DamageViewerTabs';
import Error from '../_error';

const Announce = ({ announceRaw, err }) => {
    const refImg = useRef();
    const router = useRouter();
    const theme = useTheme();
    const announce = new AnnounceClass(announceRaw);
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true,
    });

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

    const handleCLickImg = (index) => {
        if (refImg.current) {
            refImg.current.slideToIndex(index);
            refImg.current.fullScreen();
        }
    };

    if (!announceRaw && err) return <Error statusCode={err.statusCode}/>;

    return (
        <Container>
            <NextSeo
                title={`${announce.getTitle} - Kargain`}
                description={announce.getTheExcerpt}
            />
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

            <div className="input-tag">
                <ul className="input-tag__tags">
                    {announce.getTags && announce.getTags.map((tag, i) => {
                        return (
                            <li key={tag}>
                                {tag}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <Spacer top={50} bottom={50}/>

            <div className="wysiwyg">
                {announce.getTheContent}
            </div>

            <Spacer top={50} bottom={50}/>

            <DamageViewerTabs tabs={announce.getDamagesTabs}/>

            <Spacer top={50}/>

            {announce.getLocation.latitude && announce.getLocation.longitude && (
                <GoogleMapStatic
                    width={600}
                    height={300}
                    markers={[
                        [[announce.getLocation.latitude, announce.getLocation.longitude].join(' '),
                        ]]}
                />
            )}

            <TitleMUI>Images</TitleMUI>
            <GalleryViewer images={announce.getFormatedImagesViewer} ref={refImg}/>
            <GalleryImgsLazy images={announce.getUploadedImages} handleCLickImg={handleCLickImg}/>
            <UploadDropZone fireFiles={startUploadImages}/>

        </Container>
    );
};

Announce.getInitialProps = async function({ query, res }) {
    const { slug } = query;
    try {
        const announceRaw = await AnnounceService.getAnnounceBySlug(slug);
        return { announceRaw };
    } catch (err) {
        return { err };
    }
};

export default Announce;
