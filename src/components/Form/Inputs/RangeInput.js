import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Range, getTrackBackground, useThumbOverlap } from 'react-range';
import classNames from "classnames";
import styled from 'styled-components';
import ValidationError from "../Validations/ValidationError";

const RangeInput = ({name, rules, control, errors, ...props}) => {
    const [ values, setValues ] = useState([props.min, props.max]);

    useEffect(()=>{
        control.register({ name }, rules )
    },[]);

    const handleOnChange = (values) => {
        setValues(values);
        control.setValue(name, values);
    };

    const InputClasses = classNames(
        "input-field",
        {'w-100' : props.fullwidth},
        props.classNames,
    );

    const LabelContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25px;
        width: 10px;
        border-radius: 4px;
        background-color: #FFF;
        box-shadow: 0px 2px 6px #AAA;
    `;

    const LabelBtn = styled.div`
        position: absolute;
        top: -30px;
        width: max-content;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
        padding: 2px 5px;
        border-radius: 4px;
        background-color: #548BF4;
    `;

    const styles = { height: '31px', display: 'flex', margin : '0 auto', width:'100%', ...props.style};

    return (
        <>
            <div className={InputClasses} style={{ width: '80%', margin : '0 auto' }}>
                <Range
                    values={values}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                    onChange={handleOnChange}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={styles}>
                            <div ref={props.ref}
                                style={{
                                    height: '5px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: 'silver',
                                    alignSelf: 'center'
                                }}>
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ index, props, isDragged }) => (
                        <LabelContainer {...props} style={{ ...props.style, backgroundColor: isDragged ? '#548BF4' : '#CCC'}}>
                            <LabelBtn className="LabelBtn">
                                <span> {values[index]} € </span>
                            </LabelBtn>
                        </LabelContainer>
                    )}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

RangeInput.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.Number,
    max: PropTypes.Number
};

RangeInput.defaultProps = {
    rules: {},
    min: 1000,
    max: 10000,
    step: 1000
};

export default RangeInput;
