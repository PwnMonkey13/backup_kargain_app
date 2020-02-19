import React, { useState, useEffect } from 'react';
import {Row, Col} from 'reactstrap'
import AnnounceService from '../services/AnnounceService';
import AnnounceCard from '../components/AnnounceCard';

const Index = () => {
    const [ announces, setAnnounces ] = useState([]);

    const fetchAnnounces = () => {
        AnnounceService.getAnnounces().then(response => {
            setAnnounces(response);
        }).catch(err => {
            throw err;
        });
    };

    useEffect(() => {
        fetchAnnounces();
    }, []);

    return (
        <main>
            <Row>
                <Col md="12">
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
                            {announces && announces.map((announce, index) =>
                                <AnnounceCard key={index} announce={announce}/>
                            )}
                        </section>

                    </div>
                </Col>
            </Row>
        </main>
    )
};

export default Index;
