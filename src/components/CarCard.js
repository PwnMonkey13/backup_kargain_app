import React from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import TitleMUI from './TitleMUI'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },

    paragraph:{
        color: '#3d4248',
        font: '700 14px Quicksand',
        marginTop: '10px',
        display: 'block',
        lineHeight: '20px'
    },

    button: {
        padding: theme.spacing(1),
    },
}))

export default function CarCard({location, imgSrc, imgTitle, topText, excerpt, title, subTitle, viewsCount, commentsCount}) {
    const classes = useStyles();

    return (
        <Link href={location} prefetch={false}>
            <Card className={classes.root}>
                <CardActionArea>
                    <div className="m-2 p-1 mx-auto text-center">
                        <TitleMUI as="p"><strong>{topText}</strong></TitleMUI>
                    </div>
                    <CardMedia
                        component="img"
                        src={imgSrc}
                        title={imgTitle}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {subTitle}
                        </Typography>
                        <p className={classes.paragraph}>
                            {excerpt}
                        </p>
                    </CardContent>
                </CardActionArea>
                <CardActions className="justify-content-center">

                    <Button
                        size="small"
                        color="default"
                        variant="contained"
                        className={classes.button}
                        startIcon={<VisibilityIcon />}
                    >
                        {viewsCount}
                    </Button>

                    <Button
                        size="small"
                        color="default"
                        variant="contained"
                        className={classes.button}
                        startIcon={<CommentIcon />}
                    >
                        {commentsCount}
                    </Button>

                    <Button color="primary"
                            className={classes.button}>
                        Modifier
                    </Button>
                    <Button color="primary"
                            className={classes.button}>
                        Supprimer
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}
