import React from "react";
import {
    CheckboxInput,
    CheckboxMultipleInput,
    EmailInput,
    FileInput,
    NumberInput,
    PasswordInput,
    RadioInput,
    SelectInput,
    TelInput,
    TextareaInput,
    TextInput
} from "./Inputs";

import {
    ManufactureYearSelectGroup,
    TechnicalPaperTabGroup,
} from "./announceFields";

const SwitchInput = (props) => {
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
            return <CheckboxInput {...props}/>;
        case 'checkbox-multiple':
            return <CheckboxMultipleInput {...props}/>;
        case 'radio':
            return <RadioInput {...props}/>;
        case 'select':
            return <SelectInput {...props}/>;
        case 'tel':
            return <TelInput {...props} />;
        case 'file':
            return <FileInput {...props}/>;
        case 'YearSelect' :
            return <ManufactureYearSelectGroup {...props} />;
        case 'technicalPaperTabs':
            return <TechnicalPaperTabGroup {...props} />;
    }
};

export default SwitchInput;
