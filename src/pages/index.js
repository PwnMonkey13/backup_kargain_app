import React, {memo, useEffect, useState} from 'react';
import {Col, Row} from 'reactstrap'
import NiceSelect from 'react-select';
import styled from 'styled-components';
import AnnounceService from '../services/AnnounceService';
import HomeFilters from "../components/HomeFilters";
import AnnounceCard from '../components/AnnounceCard';
import Header from "../components/Header";
import {SelectOptionsUtils} from "../libs/formFieldsUtils";
import Pagination from "react-paginating";
import useIsMounted from "../hooks/useIsMounted";
import Loader from "../components/Loader";

const Index = (props) => {
    const isMounted = useIsMounted();
    const [state, setState] = useState({
        loading : true,
        sorters: props.sorters,
        filters: {},
        page: 1,
        announces: [],
        total: 0,
    });

    const fetchAnnounces = () => {
        const {sorters, filters, page} = state;
        const {size} = props;
        setState(state => ({...state, loading : true }));

        AnnounceService.getAnnounces({sorters, filters, page, size})
            .then(data => {
                setState(state => ({
                    ...state,
                    announces: data.announces,
                    total: data.total,
                    loading : false,
                }));
            }).catch(err => {
                throw err;
            }
        );
    };

    useEffect(() => {
        fetchAnnounces();
    }, [state.sorters, state.filters, state.page]);

    useEffect(() => {
        if(isMounted){
            fetchAnnounces();
            window.scrollTo(0, 0);
        }
    },[state.page]);

    const handlePageChange = (page, e) => {
        setState(state => ({
            ...state,
            page
        }));
    };

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters
        }))
    };

    const TopSortComponent = () => {
        const [sortedValue, setSortedValue] = useState('');

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
                        options={SelectOptionsUtils([
                            "Date de mise en annonce",
                            "Date d'achat",
                            "Prix",
                            "Kilométrage"
                        ])}
                        value={sortedValue}
                        onChange={onChange}
                        classNames='w-100'
                    />
                </Div>
            </Container>
        )
    };

    const MainComponent = () => {
        const {loading, announces} = state;
        if(loading) return <Loader/>;
        else if (announces && announces.length > 0) {
            return (
                <div>
                    {announces.map((announce, index) => (
                        <AnnounceCard key={index} announce={announce}/>
                    ))}
                </div>
            );
        } else return <div>No items found</div>;
    };

    const Paginate = memo(() => {
        return (
            <div className="d-flex flex-row py-2 align-items-center">
                <Pagination
                    total={state.total}
                    limit={props.size}
                    pageCount={props.paginate}
                    currentPage={state.page}
                >
                    {({
                          pages,
                          currentPage,
                          hasNextPage,
                          hasPreviousPage,
                          previousPage,
                          nextPage,
                          totalPages,
                          getPageItemProps
                      }) => (
                        <div>
                            <button
                                {...getPageItemProps({
                                    pageValue: 1,
                                    onPageChange: handlePageChange
                                })}
                            >
                                first
                            </button>

                            {hasPreviousPage && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: previousPage,
                                        onPageChange: handlePageChange
                                    })}
                                >
                                    {"<"}
                                </button>
                            )}

                            {pages.map(page => {
                                let activePage = null;
                                if (currentPage === page) {
                                    activePage = {backgroundColor: "#fdce09"};
                                }
                                return (
                                    <button
                                        {...getPageItemProps({
                                            pageValue: page,
                                            key: page,
                                            style: activePage,
                                            onPageChange: handlePageChange
                                        })}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            {hasNextPage && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: nextPage,
                                        onPageChange: handlePageChange
                                    })}
                                >
                                    {">"}
                                </button>
                            )}

                            <button
                                {...getPageItemProps({
                                    pageValue: totalPages,
                                    onPageChange: handlePageChange
                                })}
                            >
                                last
                            </button>
                        </div>
                    )}
                </Pagination>
            </div>
        )
    });

    const PaginateSituation = memo(() => {
        const { announces, page} = state;
        console.log(announces.length, page, props.size);
        let tot = announces.length;
        if(page > 1) tot += page * props.size;
        return(
            tot ? <p className="py-2 text-center">{ tot } announces sur { state.total} </p> : null
        )
    });

    return (
        <main className="content">
            {state.announces &&
            <Header text={`${state.announces.length} ${state.announces.length > 1 ? 'résultats' : 'résultat'}`}/>}
            <Row>
                <Col sm="12" md="3">
                    <HomeFilters updateFilters={updateFilters}/>
                </Col>
                <Col sm="12" md="9">
                    <section>
                        <TopSortComponent/>
                    </section>
                    <section className="d-flex flex-column align-items-center">
                        <PaginateSituation/>
                        <MainComponent/>
                        <PaginateSituation/>
                        <Paginate/>
                    </section>
                </Col>
            </Row>
        </main>
    )
};

Index.defaultProps = {
    paginate : 3,
    size: 5,
    sorters: [
        {
            property: 'date',
            direction: 1
        },
    ]
};

export default Index;
