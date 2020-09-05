import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useRouter} from 'next/router'
import { Container } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import SearchFiltersAdvanced from '../components/Filters/Advanced/SearchFiltersAdvanced';
import AnnounceService from '../services/AnnounceService';
import SearchResults from '../components/Search/SearchResults'
import useIsMounted from '../hooks/useIsMounted';
import { ModalDialogContext } from '../context/ModalDialogContext'

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
    }
}));

const SearchPage = () => {
    const router = useRouter()
    const { query } = router.query;
    const isMounted = useIsMounted()
    const classes = useStyles()
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [state, setState] = useState({
        loading: false,
        sorter: {},
        filters: {},
        page: 1,
        announces: [],
        total: 0
    });

    const handleDeleteFilter = (key) => () => {
        const { [key] : del , ...rest } = state.filters

        setState(state => ({
            ...state,
            filters: rest
        }))
    };

    const fetchSearch = useCallback(async () => {

        const { sorter, filters, page } = state;
        // const { size } = props;

        const params = {
            ...filters,
            sort_by: sorter.key,
            sort_ord: sorter.asc ? 'ASC' : null,
            page
            // size
        };

        try{
            const result = await AnnounceService.getSearchAnnounces(params);
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
    },[state.page, state.filters, state.sorter])

    useEffect(()=> {
        if (isMounted) fetchSearch()
    },[fetchSearch, isMounted])

    return (
        <Container>
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
            ): (
                <SearchFiltersAdvanced
                    query={query}
                    updateFilters={filters => {
                        setState(state => ({
                            ...state,
                            filters,
                            hideFilters: true
                        }))
                    }}
                />
            )}
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
