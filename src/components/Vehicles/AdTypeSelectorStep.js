import React, { useContext, useRef } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { FormContext } from '../../context/FormContext';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    label: {
        minHeight: '5rem',
        display: 'inline-block!important',
    },
    img: {
        maxWidth: '80px',
        objectFit: 'contain',
    },
}));

const AdTypeSelectorStep = ({ handleSelectAdType }) => {
    const classes = useStyles();

    const formRef = useRef(null);
    const { register, handleSubmit } = useForm();
    const { dispatchFormUpdate } = useContext(FormContext);

    const tabsRadio = [
        {
            value: 'sale',
            label: 'Vendre un véhicule',
            img: 'svg/sale-a-car.svg',
        },
        {
            value: 'rent',
            label: 'Louer un véhicle',
            img: 'svg/rent-a-car.svg',
        },
        // {
        //     value: 'Acheter',
        //     label: 'Camping car',
        //     img: 'svg/tab-camper.png'
        // },
    ];

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const onSubmit = (data) => {
        const tab = tabsRadio.find(tab => tab.value === data.adType);
        dispatchFormUpdate({
            adType: {
                value: tab.value,
                label: tab.label,
            },
        });
        handleSelectAdType(data.adType);
    };

    return (
        <form className="form_wizard my-4" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-center">
                {tabsRadio && tabsRadio.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={3} md={3} lg={4}>
                            <div className="form-check form-check-vehicle m-0" style={{ minHeight: '5rem' }}>
                                <input id={`ad_type${index}`}
                                       type="radio"
                                       name="adType"
                                       value={tab.value}
                                       ref={register}
                                       onChange={() => triggerSubmit()}
                                />
                                <label className={classes.label}
                                       htmlFor={`ad_type${index}`}>
                                    <img className={classes.img}
                                         src={`/images/${tab.img}`}
                                         alt={tab.label}
                                         title={tab.label}
                                    />
                                    <Typography component="h3" variant="h3">{tab.label}</Typography>
                                </label>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </form>
    );
};

export default AdTypeSelectorStep;
