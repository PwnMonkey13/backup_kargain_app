import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import damagesFilters from './damagesFilters'
import DamageSelectorTabs from './DamageSelectorTabs'
import vehiclesDamagesTabs from './vehiclesDamagesTabs.json'

const DamageSelectorControlled = ({vehicleType, name, control, defaultValues, selectorFullWidth }) => {
    const [tabs, setTabs ] = useState([])

    useEffect(() => {
        const vehicleTabs = vehiclesDamagesTabs[vehicleType];
        const preparedTabs = damagesFilters(vehicleType, vehicleTabs).map((tab, index) => ({
            ...tab,
            stages: defaultValues?.[index]?.stages ?? [],
        }))
        setTabs(preparedTabs)
    }, []);

    useEffect(()=>{
        control.register({ name });
        control.setValue(name, tabs);
    },[tabs])

    return (
        <DamageSelectorTabs
            selectorFullWidth={selectorFullWidth}
            defaultMaxDamages={5}
            tabs={tabs}
            fireChanges={damages => {
                control.setValue('damages', damages);
            }}
        />
    );
};

DamageSelectorControlled.propTypes = {
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

DamageSelectorControlled.defaultProps = {
    vehicleType : 'car'
}

export default DamageSelectorControlled;
