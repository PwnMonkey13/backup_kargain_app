import React, { memo, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'reactstrap'
import Pagination from 'react-paginating'
import AnnounceService from '../services/AnnounceService'
import useIsMounted from '../hooks/useIsMounted'
import Filters from '../components/HomeFilters/Filters'
import Sorters from '../components/HomeFilters/Sorters'
import AnnounceCard from '../components/AnnounceCard'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { Button } from '@material-ui/core'
import clsx from 'clsx'

const Index = (props) => {
    const isMounted = useIsMounted()
    const [state, setState] = useState({
        loading: false,
        sorter: props.sorter,
        filters: {},
        page: 1,
        announces: [],
        total: 0
    })

    const [ filtersOpened, toggleFilters ] = useState(false)

    const toggleOpenFilters = () => {
        toggleFilters(open => !open)
    }

    const fetchAnnounces = () => {
        const { sorter, filters, page } = state
        const { size } = props
        setState(state => ({
            ...state,
            loading: true
        }))

        AnnounceService.getAnnouncesLegacy({
            filters,
            sorter,
            page,
            size
        })
            .then(data => {
                setState(state => ({
                    ...state,
                    announces: data.rows,
                    total: data.total,
                    loading: false
                }))
            }).catch(err => {
                throw err
            }
        )
    }

    useEffect(() => {
        fetchAnnounces()
    }, [state.sorter, state.filters, state.page])

    useEffect(() => {
        if (isMounted) {
            fetchAnnounces()
            window.scrollTo(0, 0)
        }
    }, [state.page])

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
                <Row>
                    {announces.map((announce, index) => (
                        <Col key={index} sm={12} md={12} lg={12} xl={6}>
                            <AnnounceCard  announce={announce}/>
                        </Col>
                    ))}
                </Row>
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
        <main className="content cd-main-content">

            <section className="cd-tab-filter-wrapper">
                <div className={clsx("cd-tab-filter", filtersOpened && "filter-is-visible" )}>
                    <Sorters updateSorter={updateSorter}/>
                </div>
            </section>

            <div className={clsx("cd-filter-trigger", filtersOpened && "filter-is-visible" )}
                  onClick={()=>toggleOpenFilters()}>
                  <img src="/images/svg/icon_filter_white.svg" alt=""/>
            </div>

            <div className={clsx("cd-filter", filtersOpened && "filter-is-visible" )}>
                <Filters updateFilters={updateFilters}/>
                <span className="cd-close-trigger" onClick={()=>toggleOpenFilters()}/>
            </div>

            <section className={clsx("cd-gallery", filtersOpened && "filter-is-visible" )}>
                <MainComponent/>
                <PaginateSituation/>
                <Paginate/>
            </section>
        </main>
    )
}

Index.defaultProps = {
    paginate: 3,
    size: 5
}

export default Index
