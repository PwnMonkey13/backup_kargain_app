import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import DamageSelectorTabs from './DamageSelectorTabs';
import PropTypes from 'prop-types';

const DamageSelectorControlledCar = ({ name, control, defaultValues, selectorFullWidth }) => {
    const { t, lang } = useTranslation();

    const tabs = [
        {
            title: t('vehicles:outside-view'),
            key: 'outside-view',
            img: '/images/annotations-views/outside.png',
            maxDamages : 20
        },
        {
            title: t('vehicles:inside-view'),
            key: 'inside-view',
            img: '/images/annotations-views/inside.png',
        },
        {
            title: t('vehicles:front-face'),
            key: 'front-face',
            img: '/images/annotations-views/front.png',
        },
        {
            title: t('vehicles:rear-face'),
            key: 'rear-face',
            img: '/images/annotations-views/rear.png',
        },
        {
            title: t('vehicles:left-side'),
            key: 'side-left',
            img: '/images/annotations-views/side-left.png',
        },
        {
            title: t('vehicles:right-side'),
            key: 'side-right',
            img: '/images/annotations-views/side-right.png',
        },
        {
            title: t('vehicles:mecanic'),
            key: 'mecanic',
            img: '/images/annotations-views/skeleton.png',
        },
    ];

    const tabsPrepared = tabs.map((tab, index) => ({
        ...tab,
        stages: defaultValues?.[index]?.stages ?? [],
    }));

    useEffect(() => {
        control.register({ name });
        control.setValue(name, tabsPrepared);
    }, []);

    return (
        <DamageSelectorTabs
            selectorFullWidth={selectorFullWidth}
            defaultMaxDamages={5}
            tabs={tabsPrepared}
            fireChanges={damages => {
                control.setValue('damages', damages);
            }}
        />
    );
};

DamageSelectorControlledCar.propTypes = {
    name : PropTypes.string.isRequired,
    control : PropTypes.any.isRequired,
    defaultValues: PropTypes.arrayOf(PropTypes.shape({
        title : PropTypes.string,
        key : PropTypes.string,
        stages: PropTypes.array,
        maxDamages: PropTypes.number
    })),
    onDamagesChange: PropTypes.func,
    selectorFullWidth : PropTypes.bool
};
export default DamageSelectorControlledCar;
