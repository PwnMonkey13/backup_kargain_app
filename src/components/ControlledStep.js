import React, {memo, useEffect} from "react";
import styled from "styled-components";
import usePrevious from "../hooks/usePrevious";
import {useForm} from "react-hook-form";
const _ = require("lodash");

const Article = styled.article`
     border: 1px solid #dce0e0;
     background-color: #f7f8f9;
     border-radius: .1875rem;
     background-color: #fff;
  `;

const Step = ({step, ...props}) => {
    console.log('render step');
    const methods = useForm(props.formConfig);
    const { formState, getValues} = methods;
    const { prevStep, nextpStep, getUpdates } = props;
    const prevState = usePrevious(getValues());

    const triggerSkipStep = () => {
        console.log("triggerSkipStep");
        nextStep();
    };

    // useEffect(() => {
    //     if(isMounted && formState.dirty){
    //         const values = getValues();
    //         if(prevState !== values) {
    //             console.log("sending updates");
    //             getUpdates(values)
    //         }
    //     }
    // }, [getValues()]);

    console.log("render Controlled step");

    return (
        <Article>
            {step ? React.cloneElement(step, {methods, ...props }) : "step not found"}
        </Article>
    )
};

const propsAreEqual = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);
export default memo(Step,propsAreEqual);
