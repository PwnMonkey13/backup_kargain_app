import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import useTranslation from 'next-translate/useTranslation'
import makeStyles from '@material-ui/core/styles/makeStyles'

const fieldOptions = {
    coordinates: {
        hideValue : true
    },
    mileage : {
        suffix : 'km'
    },
    powerKw : {
        suffix : 'kw'
    },
    radius : {
        suffix : 'km'
    },
    consumptionGkm : {
        suffix : "g/km"
    },
    price: {
        suffix : "€"
    }
}

const useStyles = makeStyles(() => ({
    button: {
        width : '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const FiltersChanges = ({changes = {}, resetValue}) => {
    const { t } = useTranslation();
    const classes = useStyles()
    const fieldsToHide = ["coordinates"]
    const filtered = Object.keys(changes)
        .filter(key => !fieldsToHide.includes(key))
        .reduce((carry, key)=> ({...carry, [key] : changes[key]}),{});

    return(
        <>
            {Object.keys(filtered).length !== 0 && (
            <>
                <Typography variant="h4">{t('vehicles:filtered-by')} : </Typography>
                <ul className="list-style-none">
                    {Object.keys(filtered).map((name, index) => {
                        const filter = changes[name]

                        return (
                            <li key={index} className="my-1">
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    endIcon={<HighlightOffIcon/>}
                                    onClick={() => resetValue(name)}
                                >
                                    <RenderFilterLabel
                                        name={name}
                                        filter={filter}
                                    />
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </>
            )}
        </>
    )
}

const RenderFilterLabel = ({name, filter}) => {
    const { t } = useTranslation();
    const options = fieldOptions[name];
    let val =  null;

    if(options?.hideValue) return null

    if(Array.isArray(filter)) {
        val = filter
            .filter(v => typeof v !== "object")
            .map(v => options?.suffix ? `${v}${options?.suffix}` : v)
            .join(' - ')
    }
    else if(typeof filter === "object") val = options?.suffix ? `${filter?.label} ${options?.suffix}` : filter?.label;
    else val = options?.suffix ? `${filter} ${options?.suffix}` : filter;

    if(val){
        return(
            <>
                {t(`filters:${name}`)} : {val}
            </>
        )
    }

}

export default FiltersChanges
