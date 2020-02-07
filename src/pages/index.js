import React, { useState, useEffect, useContext } from 'react';
import {Container, Row, Col} from 'reactstrap'
import {UserContext} from '../components/Context/UserContext';
import Layout from '../layouts/Layout'
import AnnounceService from '../services/AnnounceService';

const AnnounceCard = (props) => {
    return (
        <div className="objava-wrapper">
            <div className="top-profile-wrapper">
                <a href="#">
                    <img src="images/profile.png" alt="" className="img-profile-wrapper"/>
                </a>
                <div className="top-profile-content-wrapper-pre">
                    <div className="top-profile-content-wrapper">
                        <div className="top-profile-name-btn">
                            <a href="#" className="top-profile-name">Fred</a>
                        </div>
                        <div className="top-profile-data-wrapper">
                            <a href="#" className="top-profile-location">
                                <img src="images/location.png" alt=""/>
                                Paris 75005, France</a>
                        </div>
                    </div>
                    <div className="share">il y a 6 heures
                        <img src="images/share.png" alt=""
                             data-toggle="modal"
                             data-target="#exampleModalCenter2"/>
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
            <h1 className="annonce">Marque | modèle | 2001 | 50 000km | Essence</h1>
            <p className="hashes-wrapper">
                <a href="#">#hashtag</a>
                <a href="#">#hashtag</a>
                <a href="#">#hashtag</a>
                <a href="#">#hashtag</a>
                <a href="#">#hashtag</a>
                <a href="#">#hashtag</a>
            </p>
            <div className="questions-prof-wrapper">
                <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
                <p className="qusetion-wrapper"><span><a href="#">prestigcars</a></span> je reserve</p>
            </div>
            <form action="#">
                <textarea className="add-comment" placeholder="Ajouter un commentaire..."/>
            </form>
            <a href="#" className="btn btn-primary btn-publier">Plus d’infos</a>
        </div>
    );
};

const Index = ({...props}) => {
    const [ announces, setAnnounces ] = useState([]);
    const {session, dispatch} = useContext(UserContext);

    useEffect(async () => {
        const result = await AnnounceService.getWPAnnounces();
        setAnnounces(result);
        return ()=>{console.log('unmounted')}
    }, []);

    return (
        <Layout fluid>
            <Row>
                <Col md="4">
                    <p>left filter</p>
                </Col>
                <Col md="8">
                    <div className="righ-filter-wrapper">
                        <div className="search-flex">
                            <p className="search-p-grey">Aucun filtre sélectionné</p>
                            <div className="dropdown-wrapper">
                                <span>Trier par :</span>
                                <select>
                                    <option value="1">Prix croissant</option>
                                    <option value="1">A6</option>
                                    <option value="1">A7</option>
                                </select>
                                <div className="nice-select" tabIndex="0"><span
                                    className="current">Prix croissant</span>
                                    <ul className="list">
                                        <li data-value="1" className="option selected">Prix croissant</li>
                                        <li data-value="1" className="option">A6</li>
                                        <li data-value="1" className="option">A7</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <section>
                            {announces && announces.map((announce, index) => {
                                return (
                                    <AnnounceCard key={index} announce={announce}/>
                                )
                            })}
                        </section>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
};

// Index.getInitialProps = async function (ctx) {
//     try {
//         const announces = await AnnounceService.getWPAnnounces();
//         console.log(announces);
//         return {announces};
//     } catch (err) {
//         return err;
//     }
// };

export default Index;
