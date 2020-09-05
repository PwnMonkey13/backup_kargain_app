import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next-translate/Link';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import UserModel from '../models/user.model';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },

    list: {
        listStyleType: 'none',
        height: '500px',
        width: '300px',
        overflowX: 'hidden',
        overflowY: 'scroll'
    },

    pointerClose: {
        display: 'flex',
        cursor: 'pointer'
    }
}));

export default function ModalFollowers ({ title, likes, open, handleClose }) {
    const classes = useStyles();

    return (
        <Modal className={classes.modal} open={open} onClose={handleClose}>
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography component="h2" variant="h2">
                        {title} ({likes.length})
                    </Typography>
                    <div className="my-2">
                        <ul className={classes.list}>
                            {likes && likes
                                .map((userLike, index) => {
                                    const user = new UserModel(userLike?.user);
                                    return (
                                        <li key={index} className="nav-item navbar-dropdown p-1">
                                            <Link href={user.getProfileLink}>
                                                <a className="d-flex align-items-center">
                                                    <img className="dropdown-toggler rounded-circle mx-2"
                                                        width="50"
                                                        height="50"
                                                        src={user.getAvatar}
                                                        title={user.getFullName}
                                                        alt={user.getUsername}
                                                    />
                                                    <Typography variant="body1">
                                                        {user.getFullName}
                                                    </Typography>
                                                </a>
                                            </Link>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}
