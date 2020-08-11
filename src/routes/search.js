import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { Container } from 'reactstrap'
import { useRouter} from 'next/router'
import clsx from 'clsx'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useIsMounted from '../hooks/useIsMounted';
import AnnounceService from '../services/AnnounceService';
import { ModalDialogContext } from '../context/ModalDialogContext'
import SearchResults from '../components/Search/SearchResults'
import SearchFiltersLight from '../components/Filters/Light/SearchFiltersLight';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
    },
    chip: {
        margin: theme.spacing(0.5)
    },

    filtersContainer: {
        padding: '.5rem'
    },

    filtersTop: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid gainsboro'
    },

    filtersHidden: {
        display: 'none'
    }
}));

const SearchPage = ( ) => {
    const router = useRouter()
    const classes = useStyles()
    const { query } = router.query;
    const isMounted = useIsMounted()
    const {t} = useTranslation()
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [state, setState] = useState({
        loading: false,
        sorter: {},
        hideFilters : false,
        filters: {},
        page: 1,
        announces: [],
        total: 0
    });

    const fetchSearch = useCallback(async () => {
        try{
            const result = await AnnounceService.getSearchAnnounces(state.filters);
            setState(state => ({
                ...state,
                announces: result.rows || [],
                total: result.total || 0,
                loading: false
            }))
        } catch (err) {
            setState(state => ({
                ...state,
                loading: false
            }));
            dispatchModalError({err})
        }
    },[state.filters])

    const handleDeleteFilter = (key) => () => {
        const { [key] : del , ...rest } = state.filters

        setState(state => ({
            ...state,
            filters: rest
        }))
    };

    const toggleFilters = () => {
        setState(state => ({
            ...state,
            hideFilters: !state.hideFilters
        }))
    };

    useEffect(()=> {
        if (isMounted) {
            fetchSearch()
        }
    },[fetchSearch, isMounted])

    return (
        <Container>
            <NextSeo
                title="Kargain"
                description="Vos meilleurs annonces automobiles"
            />

            <div className="mt-4">
                {state.hideFilters ? (
                    <>
                        <Paper component="ul" className={classes.root}>
                            {Object.keys(state.filters).map((key, index) => {
                                return (
                                    <li key={index}>
                                        <Chip
                                            label={`${key} : ${state.filters[key]}`}
                                            onDelete={handleDeleteFilter(key)}
                                            className={classes.chip}
                                        />
                                    </li>
                                );
                            })}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>{
                                    setState(state => ({
                                        ...state,
                                        hideFilters: false
                                    }))}}
                            >
                                modifier les filters
                            </Button>
                        </Paper>
                        <SearchResults results={state}/>
                    </>
                ) : (
                    <div className={classes.filtersContainer}>
                        <div className={classes.filtersTop} onClick={() => toggleFilters()}>
                            <Typography variant="h4">
                                {t('filters:select-filters')}
                                <i className={clsx('ml-2', 'arrow_nav', state.hideFilters ? 'is-top' : 'is-bottom')}/>
                            </Typography>
                        </div>
                        <div className={clsx(state.hideFilters && classes.filtersHidden)}>
                            <SearchFiltersLight
                                query={query}
                                updateFilters={filters =>{
                                    setState(state => ({
                                        ...state,
                                        filters,
                                        hideFilters: true
                                    }))}
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    )
};

SearchPage.propTypes = {
    featuredImgHeight: PropTypes.number,
    announces: PropTypes.shape({
        rows: PropTypes.array
    })
};

SearchPage.defaultProps = {
    featuredImgHeight: 500
};
export default SearchPage;
