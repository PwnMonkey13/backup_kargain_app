import React, { useContext, useRef } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FormContext } from '../../context/FormContext';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    label: {
        minHeight: '5rem',
        display: 'inline-block!important'
    },
    img: {
        maxWidth: '80px',
        objectFit: 'contain'
    }
}));

const AdTypeSelectorStep = ({ handleSelectAdType }) => {
    const classes = useStyles();
    const formRef = useRef(null);
    const { register, handleSubmit } = useForm();
    const { dispatchFormUpdate } = useContext(FormContext);

    const AnnounceTypes = [
        {
            value: 'sale',
            label: 'Vente'
        },
        {
            value: 'sale-pro',
            label: 'Vente pro'
        },
        {
            value: 'rent',
            label: 'Location'
        }
    ]

    const triggerSubmit = () => {
        formRef.current.dispatchEvent(new Event('submit'));
    };

    const onSubmit = (data) => {
        dispatchFormUpdate({
            adType: data.adType
        });
        handleSelectAdType(data.adType);
    };

    return (
        <form className="form_wizard my-4" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-center">
                {AnnounceTypes && AnnounceTypes.map((tab, index) => {
                    return (
                        <Col key={index} xs={6} sm={3} md={3} lg={4}>
                            <div className="form-check-transparent"
                                style={{ minHeight: '5rem' }}>
                                <input id={`ad_type${index}`}
                                    type="radio"
                                    name="adType"
                                    value={tab.value}
                                    ref={register}
                                    onChange={() => triggerSubmit()}
                                />
                                <label htmlFor={`ad_type${index}`}>{tab.label}</label>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </form>
    );
};

export default AdTypeSelectorStep;
