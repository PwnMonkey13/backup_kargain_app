import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { ModalDialogContext } from '../context/ModalDialogContext';
import PaginateResultsSituation from '../components/PaginateResultsSituation';
import PaginateResults from '../components/PaginateResults';
import AnnounceService from '../services/AnnounceService';
import Sorters from '../components/HomeFilters/Sorters';
import AnnounceCard from '../components/AnnounceCard';
import { useAuth } from '../context/AuthProvider';
import Filters from '../components/HomeFilters/Filters';
import { NextSeo } from 'next-seo';

const Index = (props) => {
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { isAuthenticated } = useAuth();
    const [filtersOpened, toggleFilters] = useState(false);
    const { t } = useTranslation();
    const [state, setState] = useState({
        loading: false,
        sorter: {},
        filters: {},
        page: 1,
        announces: [],
        total: 0,
    });

    const toggleOpenFilters = () => {
        toggleFilters(open => !open);
    };

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
        <div className="home">

            <section className="cd-tab-filter-wrapper">
                <div className={clsx('cd-tab-filter', filtersOpened && 'filter-is-visible')}>
                    <Sorters updateSorter={updateSorter}/>
                </div>
            </section>

            <div className={clsx('cd-filter-trigger', filtersOpened && 'filter-is-visible')}
                 onClick={() => toggleOpenFilters()}>
                <img src="/images/svg/icon_filter_white.svg" alt=""/>
            </div>

            <div className={clsx('cd-filter', filtersOpened && 'filter-is-visible')}>
                <div className="cd-filters-top" onClick={() => toggleOpenFilters()}>
                    <span className="cd-close-trigger"/>
                </div>
                <Filters updateFilters={updateFilters}/>
            </div>

            <section className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>

                <Row className="my-2 d-flex justify-content-center">
                    {state.announces ? state.announces.map((announceRaw, index) => (
                        <Col key={index} sm={12} md={6} lg={6} xl={6} className="my-2">
                            <AnnounceCard {...{
                                announceRaw,
                                isAuthenticated,
                                detailsFontSize : "13px"
                            }}/>
                        </Col>
                    )) : (
                        <p>{(t('vehicles:no-ads-found'))}</p>
                    )}
                </Row>

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
        </div>
    );
};

Index.defaultProps = {
    paginate: 3,
    size: 5,
};

export default Index;
