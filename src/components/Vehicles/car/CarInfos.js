import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        flex : 1,
    },

    spec: {
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',

        '& span': {
            fontWeight: 700,
        },
    },
}));

const CarInfos = memo(({ announce, enableThirdColumn }) => {
    const classes = useStyles();
    const cols = enableThirdColumn ? 4 : 6

    return (
        <Row className="specs my-2 p-2">
            <Col sm={12} md={cols}>
                 <div className={classes.spec}>
                    <Typography>
                        <span>Marque: </span>{announce.getManufacturer.make}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Modele: </span>{announce.getManufacturer.model}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Année: </span>{announce.getManufacturer.year}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Version: </span>{announce.getManufacturer.version}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Kilométrage: </span>{announce.getMileage} km
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Carburant: </span>{announce.geVehicleEngine.gas}
                    </Typography>
                </div>
            </Col>
            <Col sm={12} md={cols}>
                <div className={classes.spec}>
                    <Typography>
                        <span>Boite: </span>{announce.geVehicleEngine.type}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Cylindrée: </span>{announce.geVehicleEngine.cylinder}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Puissance CH: </span>{announce.getVehiclePower.ch}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Carte grise: </span>{announce.getNationality}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Fonction: </span>{announce.getVehicleFunction}
                    </Typography>
                </div>
                <div className={classes.spec}>
                    <Typography>
                        <span>Classe d'émission: </span>{announce.getVehicleEmissionClass}
                    </Typography>
                </div>
            </Col>

            { enableThirdColumn && (
                <Col sm={12} md={cols}>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Etat général: </span>{announce.getVehicleGeneralState}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Nombre de portes: </span>{announce.getVehicleDoors}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Nombre de sièges: </span>{announce.getVehicleSeats}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Couleur extérieure: </span>{announce.getVehicleExternalColor}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Couleur intérieure: </span>{announce.getVehicleInternalColor}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Peinture: </span>{announce.getVehiclePaintColor}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography>
                            <span>Nombre de propriétaires: </span>{announce.getVehicleCountOwners}
                        </Typography>
                    </div>
                    <div className={classes.spec}>
                        <Typography> <span>Matériaux: </span></Typography>
                        <ul>
                            {announce.getVehicleMaterials && announce.getVehicleMaterials.map((material, i) => {
                                return (
                                    <li key={i}> {material.label}</li>
                                );
                            })}
                        </ul>
                    </div>
                </Col>
            )}
        </Row>
    );
});

CarInfos.propTypes = {
    announce: PropTypes.object.isRequired,
    responsiveCols: PropTypes.bool,
    enableThirdColumn : PropTypes.bool
};
export default CarInfos;
