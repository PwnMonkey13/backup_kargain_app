import React, { useMemo } from 'react';
import {
    TextInput,
    NumberInput,
    EmailInput,
    PasswordInput,
    CheckBoxInput,
    CheckboxMultipleInput,
    RadioInput,
    SelectInput,
    TextareaInput,
} from "./Inputs";

const SwitchInput = (props) => {
    const Switch = (props) => {
        switch (props.type) {
            case "text":
            default :
                return <TextInput {...props}/>;
            case 'number':
                return <NumberInput {...props}/>;
            case 'password':
                return <PasswordInput {...props}/>;
            case 'email':
                return <EmailInput {...props}/>;
            case 'textarea' :
                return <TextareaInput {...props} />;
            case 'checkbox':
                return <CheckBoxInput{...props}/>;
            case 'checkbox-multiple':
                return <CheckboxMultipleInput {...props}/>;
            case 'radio':
                return <RadioInput {...props}/>;
            case 'select':
                return <SelectInput {...props}/>;
            // case 'tel':
            //     return <TelInput {...props} />;
            // case 'file':
            //     return <FileInput {...props}/>;
            // case 'YearSelect' :
            //     return <ManufactureYearSelectGroup {...props} />;
            // case 'technicalPaperTabs':
            //     return <TechnicalPaperTabGroup {...props} />;
        }
    };

    return useMemo(() => Switch(props),[props]);
};

export default SwitchInput;
