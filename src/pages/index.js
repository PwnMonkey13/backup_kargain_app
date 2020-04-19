import React, { memo, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'reactstrap'
import Pagination from 'react-paginating'
import AnnounceService from '../services/AnnounceService'
import Filters from '../components/HomeFilters/Filters'
import Sorters from '../components/HomeFilters/Sorters'
import AnnounceCard from '../components/AnnounceCard'
import Header from '../components/Header'
import useIsMounted from '../hooks/useIsMounted'
import Loader from '../components/Loader'

const Index = (props) => {
    const isMounted = useIsMounted();
    const [state, setState] = useState({
        loading: true,
        sorter: props.sorter,
        filters: {},
        page: 1,
        announces: [],
        total: 0
    })

    const fetchAnnounces = () => {
        const { sorter, filters, page } = state
        const { size } = props
        setState(state => ({
            ...state,
            loading: true
        }))

        AnnounceService.getAnnounces({
            filters,
            sorter,
            page,
            size
        })
            .then(data => {
                setState(state => ({
                    ...state,
                    announces: data.announces,
                    total: data.total,
                    loading: false
                }))
            }).catch(err => {
                throw err
            }
            )
    }

    useEffect(() => {
        fetchAnnounces();
    }, [state.sorter, state.filters, state.page]);

    useEffect(() => {
        if (isMounted) {
            fetchAnnounces();
            window.scrollTo(0, 0);
        }
    }, [state.page]);

    const handlePageChange = (page, e) => {
        setState(state => ({
            ...state,
            page
        }))
    }

    const updateFilters = (filters) => {
        setState(state => ({
            ...state,
            filters
        }))
    }

    const updateSorter = (sorter) => {
        setState(state => ({
            ...state,
            sorter
        }))
    }

    const MainComponent = () => {
        const { loading, announces } = state
        if (loading) {
            return <Loader/>
        } else if (announces && announces.length > 0) {
            return (
                <div>
                    {announces.map((announce, index) => (
                        <AnnounceCard key={index} announce={announce}/>
                    ))}
                </div>
            )
        } else {
            return <div>No items found</div>
        }
    }

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
                                    {'<'}
                                </button>
                            )}

                            {pages.map(page => {
                                let activePage = null
                                if (currentPage === page) {
                                    activePage = { backgroundColor: '#fdce09' }
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
                                )
                            })}

                            {hasNextPage && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: nextPage,
                                        onPageChange: handlePageChange
                                    })}
                                >
                                    {'>'}
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
    })

    const PaginateSituation = memo(() => {
        const { announces, page } = state
        let tot = announces.length
        if (page > 1) tot += page * props.size
        return (
            tot ? <p className="py-2 text-center">{tot} announces sur {state.total} </p> : null
        )
    })

    // const scrollListener = () => {
    //     const height = window.innerHeight
    //     const pageYOffset = window.pageYOffset
    //     // @TODO
    //     const docHeight = pageRef.current.offsetHeight;
    //     if ((docHeight - height - pageYOffset < 50) && !this.state.fetching) {
    //         this.setState({ fetching: true }, this.getArticles);
    //     }
    // }

    return (
        <main className="content">
            {state.announces &&
            <Header text={`${state.announces.length} ${state.announces.length > 1 ? 'résultats' : 'résultat'}`}/>}
            <Row>
                <Col sm="12" md="4">
                    <Filters updateFilters={updateFilters}/>
                </Col>
                <Col sm="12" md="8">
                    <section>
                        <Sorters updateSorter={updateSorter}/>
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
}

Index.defaultProps = {
    paginate: 3,
    size: 5
}

export default Index
