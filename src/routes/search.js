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

const Search = () => {
    return <SearchPage/>
};

export default Search;
