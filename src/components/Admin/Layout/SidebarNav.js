import React from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link'
import {makeStyles} from "@material-ui/styles";
import {Button, colors, List, ListItem} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
        color: theme.palette.icon,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '& $icon': {
            color: theme.palette.primary.main
        }
    }
}));

const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
    <div style={{flexGrow: 1}}>
        <Link href={href} as={hrefAs}>
            <a className={className}>
                {children}
            </a>
        </Link>
    </div>
)

const SidebarNav = props => {
    const {pages, className, ...rest} = props;
    const classes = useStyles();

    return (
        <List{...rest} className={clsx(classes.root, className)}>
            {pages.map(page => (
                <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.title}
                >
                    <Button
                        activeClassName={classes.active}
                        className={classes.button}
                        component={ButtonLink}
                        href={page.href}
                    >
                        <div className={classes.icon}>{page.icon}</div>
                        {page.title}
                    </Button>
                </ListItem>
            ))}
        </List>
    )
};

SidebarNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired,
};

export default SidebarNav;
