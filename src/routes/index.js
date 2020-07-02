import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import Typography from '@material-ui/core/Typography';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import useTranslation from 'next-translate/useTranslation';
import PaginateResultsSituation from '../components/PaginateResultsSituation';
import PaginateResults from '../components/PaginateResults';
import Sorters from '../components/HomeFilters/Sorters';
import AnnounceCard from '../components/AnnounceCard';
import Filters from '../components/HomeFilters/Filters';
import AnnounceService from '../services/AnnounceService';
import { useAuth } from '../context/AuthProvider';
import { ModalDialogContext } from '../context/ModalDialogContext';

const Index = (props) => {
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { isAuthenticated } = useAuth();
    const [filtersOpened ] = useState(false);
    const [state, setState] = useState({
        loading: false,
        sorter: {},
        filters: {},
        page: 1,
        announces: [],
        total: 0,
    });

    const fetchAnnounces = async () => {
        console.log('fetchAnnounces');
        const { sorter, filters, page } = state;
        const { size } = props;

        setState(state => ({
            ...state,
            loading: true,
        }));

        try {
            const params = {
                ...filters,
                sort_by: sorter.key,
                sort_ord: sorter.asc ? 'ASC' : null,
                page,
                size,
            };

            const result = await AnnounceService.getAnnounces(params);

            setState(state => ({
                ...state,
                announces: result.rows ?? [],
                total: result.total ?? 0,
                loading: false,
            }));
        } catch (err) {
            setState(state => ({
                ...state,
                loading: false,
            }));
            dispatchModalError({ err });
        }
    };

    useEffect(() => {
        const process = async () => {
            await fetchAnnounces();
            window.scrollTo(0, 0);
        };
        process();

        return function cleanup () {
            console.log('cleanup index');
        };

    }, [state.sorter, state.filters, state.page]);

    const handlePageChange = (page, e) => {
        setState(state => ({
            ...state,
            page,
        }));
    };

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters,
        }));
    };

    const updateSorter = (sorter) => {
        setState(state => ({
            ...state,
            sorter,
        }));
    };

    return (
        <Container>
            <NextSeo
                title="Kargain"
                description="Vos meilleurs annonces automobiles"
            />

            <section className="cd-tab-filter-wrapper">
                <div className={clsx('cd-tab-filter', filtersOpened && 'filter-is-visible')}>
                    <Sorters updateSorter={updateSorter}/>
                </div>
            </section>

            <Row>
                <Col sm={12} md={4}>
                    <Typography component="p" variant="h2">{state.announces.length} résultats de recherche</Typography>
                    <Filters updateFilters={updateFilters}/>
                </Col>

                <Col sm={12} md={8}>
                    <section className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>
                        {state.announces.length ? (
                            <Row className="my-2 d-flex justify-content-center">
                                {state.announces.map((announceRaw, index) => (
                                    <Col key={index} sm={12} md={12} className="my-2">
                                        <AnnounceCard {...{
                                            announceRaw,
                                            isAuthenticated,
                                            detailsFontSize: '13px',
                                        }}/>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="d-flex flex-column my-2 mx-auto">
                                <FindInPageIcon fontSize="large"/>
                                <Typography variant="h3">
                                    No result found
                                </Typography>
                                <p>
                                    Try to change filters
                                </p>
                            </div>
                        )}

                        <PaginateResultsSituation
                            count={state.announces.length}
                            page={state.page}
                        />

                        <PaginateResults
                            total={state.total}
                            limit={props.size}
                            pageCount={props.paginate}
                            currentPage={state.page}
                            handlePageChange={handlePageChange}
                        />
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

Index.defaultProps = {
    paginate: 3,
    size: 5,
};

export default Index;
