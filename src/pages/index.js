import React, { useState, useEffect } from 'react';
import {Row, Col} from 'reactstrap'
import NiceSelect from 'react-select';
import styled from 'styled-components';
import AnnounceService from '../services/AnnounceService';
import HomeFilters from "../components/HomeFilters";
import AnnounceCard from '../components/AnnounceCard';
import useIsMounted from "../hooks/useIsMounted";
import {createSorter} from "../libs/utils";
import Header from "../components/Header";
import _ from 'lodash';
import {SelectOptionsUtils} from "../libs/formFieldsUtils";

const Index = (props) => {
    const isMounted = useIsMounted();
    const [ state, setState ] = useState({
        sorters : props.sorters,
        filters : {},
        announces : []
    });

    const fetchAnnounces = () => {
        const { sorters, filters} = state;
        AnnounceService.getAnnounces(sorters, filters).then(response => {
            setState(state => ({
                ...state,
                announces : response
            }));
        }).catch(err => {
            throw err;
        });
    };

    useEffect(() => {
        fetchAnnounces();
    }, [state.sorters, state.filters]);


    const updateFilters = (filters) => {
        setState(state =>({
            ...state,
            filters
        }))
    };

    const TopSortComponent = () => {
        const [ sortedValue, setSortedValue] = useState('');

        const onChange = (value) => {
            setSortedValue(value);
        };

        const Container = styled.div`
            display: flex;
            align-items: center;
            justify-content: flex-end;
        `;

        const Div = styled.div`
            margin : 1rem;
            width : 10rem
        `;

        return (
            <Container>
                <span>Trier par :</span>
                <Div>
                    <NiceSelect
                        name="sortby"
                        options={SelectOptionsUtils(["Date de mise en annonce", "Date d'achat", "Prix", "Kilométrage"])}
                        value={sortedValue}
                        onChange={onChange}
                        classNames='w-100'
                    />
                </Div>
            </Container>
        )
    };

    const renderLoading = () => {
        return <div>Loading...</div>;
    };

    const renderData = () => {
        const { announces } = state;
        if (announces && announces.length > 0) {
            return (
                <div>
                    { announces.map((announce, index) => (
                        <AnnounceCard key={index} announce={announce}/>
                    ))}
                </div>
            );
        } else {
            return <div>No items found</div>;
        }
    };

    const MainComponent = () => {
        const { announces } = state;
        return announces ? renderData(announces) : renderLoading();
    };

    return (
        <main className="content">
            {state.announces && <Header text={`${state.announces.length} ${state.announces.length > 1 ? 'résultats' : 'résultat'}`} /> }
            <Row>
                <Col sm="12" md="3">
                    <HomeFilters updateFilters={updateFilters}/>
                </Col>
                <Col sm="12" md="9">
                    <section>
                        <TopSortComponent/>
                    </section>
                    <section>
                        <MainComponent/>
                    </section>
                </Col>
            </Row>
        </main>
    )
};

Index.defaultProps = {
    sorters : [
        { property: 'date', direction: 'DESC'},
    ]
};

export default Index;
