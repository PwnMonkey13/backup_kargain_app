import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const StepSection = styled.section`
     border: 1px solid #dce0e0;
     background-color: #f7f8f9;
     border-radius: .1875rem;
     background-color: #fff;
     padding: 1rem;
  `

const Step = ({ step, ...props }) => {
    const methods = useForm(props.formConfig)
    const { nextStep } = props

    const triggerSkipStep = () => {
        console.log('triggerSkipStep')
        nextStep()
    }

    return (
        <StepSection>
            {step ? React.cloneElement(step, { methods, triggerSkipStep, ...props }) : 'step not found'}
        </StepSection>
    )
}

// const propsAreEqual = (prevProps, nextProps) => {
//     return _.isEqual(prevProps, nextProps);
// };

export default Step
// export default memo(Step, propsAreEqual);
