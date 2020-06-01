import React, { useEffect } from 'react';
import DamageSelectorTabs from './DamageSelectorTabs';
import PropTypes from 'prop-types';

const DamageSelectorControlledCar = ({ name, control, defaultValues, selectorFullWidth }) => {
    const tabs = [
        {
            title: 'Vue extérieure',
            key: 'exterior',
            img: '/images/annotations-views/outside.png',
            maxDamages : 20
        },
        {
            title: 'Vue intérieure',
            key: 'interior',
            img: '/images/annotations-views/inside.png',
        },
        {
            title: 'Face avant',
            key: 'front',
            img: '/images/annotations-views/front.png',
        },
        {
            title: 'Face arrière',
            key: 'rear',
            img: '/images/annotations-views/rear.png',
        },
        {
            title: 'Coté gauche',
            key: 'side-left',
            img: '/images/annotations-views/side-left.png',
        },
        {
            title: 'Coté droit',
            key: 'side-right',
            img: '/images/annotations-views/side-right.png',
        },
        {
            title: 'Coté droit',
            key: 'side-right',
            img: '/images/annotations-views/side-right.png',
        },
        {
            title: 'Mécanique',
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
