import React, { useState, useEffect, useContext } from 'react';
import {Container, Row, Col} from 'reactstrap'
import {UserContext} from '../components/Context/UserContext';
import AnnounceService from '../services/AnnounceService';
import Layout from '../layouts/Layout';
import AnnounceCard from '../components/AnnounceCard';

const Index = ({...props}) => {
    const [ announces, setAnnounces ] = useState([]);
    const {session, dispatch} = useContext(UserContext);

    const fetchAnnounces = () => {
        console.log('fetch');
        AnnounceService.getAnnounces().then(response => {
            console.log(response);
            setAnnounces(response);
        }).catch(err => {
            throw err;
        });
    };

    useEffect(() => {
        console.log('effect');
        fetchAnnounces();
    }, []);

    return (
        <Container>
            <Row>
                <Col md="10">
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
        </Container>
    )
};

export default Index;
