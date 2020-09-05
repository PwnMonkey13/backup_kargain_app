import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation'
import Typography from '@material-ui/core/Typography';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PaginateResults from './PaginateResults';
import Sorters from './Sorters/Sorters';
import AnnounceCard from './AnnounceCard';
import AnnounceService from '../services/AnnounceService'
import { ModalDialogContext } from '../context/ModalDialogContext';
import { useAuth } from '../context/AuthProvider';
import AdvancedFilters from './Filters/Advanced/AdvancedFilters'
import Loader from '../components/Loader'

const SearchPage = ({fetchFeed, ...props}) => {
    const { t } = useTranslation()
    const { dispatchModalError } = useContext(ModalDialogContext);
    const { isAuthenticated } = useAuth();
    const [filtersOpened] = useState(false);
    const [state, setState] = useState({
        loading: false,
        sorter: {},
        filters: {},
        page: 1,
        announces: [],
        total: 0
    });

    const fetchAnnounces = useCallback(async() => {
        const { sorter, filters, page } = state;
        const { size } = props;

        const params = {
            ...filters,
            sort_by: sorter.key,
            sort_ord: sorter.asc ? 'ASC' : null,
            page,
            size
        };

        console.log(params)

        setState(state => ({
            ...state,
            loading: true
        }));

        try {
            const result = fetchFeed ?
                await AnnounceService.getFeedAnnounces(params)
                : await AnnounceService.getSearchAnnounces(params);

            setState(state => ({
                ...state,
                announces: result.rows || [],
                total: result.total || 0,
                loading: false
            }));

        } catch (err) {
            setState(state => ({
                ...state,
                loading: false
            }));
            dispatchModalError({ err });
        }
    },[state.page, state.filters, state.sorter]);

    const handlePageChange = (page) => {
        setState(state => ({
            ...state,
            page
        }));
    };

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters
        }));
    };

    const updateSorter = (sorter) => {
        setState(state => ({
            ...state,
            sorter
        }));
    };

    useEffect(() => {
        fetchAnnounces();
        window.scrollTo(0, 0);
    }, [fetchAnnounces]);

    return (
        <Container>
            <NextSeo
                title="Kargain"
                description="Vos meilleurs annonces automobiles"
            />

            <Row>
                <Col sm={12} md={4}>
                    <Typography component="p" variant="h2">{t('vehicles:{count}_results_search', { count : state.announces.length})}</Typography>
                    <Typography component="p" variant="h4">{t('vehicles:filter-by')} : </Typography>
                    <AdvancedFilters updateFilters={updateFilters}/>
                </Col>

                <Col sm={12} md={8}>
                    <section className="cd-tab-filter-wrapper">
                        <div className={clsx('cd-tab-filter', filtersOpened && 'filter-is-visible')}>
                            <Sorters updateSorter={updateSorter}/>
                        </div>
                    </section>

                    <section className={clsx('cd-gallery', filtersOpened && 'filter-is-visible')}>
                        {state.loading ? <Loader/> : (
                            <>
                                {state.announces.length ? (
                                    <Row className="my-2 d-flex justify-content-center">
                                        {state.announces.map((announceRaw, index) => (
                                            <Col key={index} sm={12} md={12} className="my-2">
                                                <AnnounceCard {...{
                                                    announceRaw,
                                                    isAuthenticated,
                                                    detailsFontSize: '13px'
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
                            </>
                        )}

                        <PaginateResults
                            totalPages={state.total}
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

SearchPage.defaultProps = {
    fetchFeed : false,
    paginate: 3,
    size: 5
};

export default SearchPage;
