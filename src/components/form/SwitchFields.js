import React from "react";
import Header from "../Header";
import Divider from "./Divider";
import SwitchInput from "./SwitchInputs";
import GroupInputs from "./Inputs/GroupInputs";

const SwitchField = ({field, setInputs}) => {
    const {componentType, ...props} = field;
    switch (componentType) {
        case 'group':
            return <GroupInputs setInputs={setInputs} {...props} />;
        case 'title':
            return <Header {...props} />;
        case 'divider':
            return <Divider/>;
        case 'input':
        default:
            return ( !field.remove &&
                <SwitchInput setInputs={setInputs} {...props} />
            );
    }
};

export default SwitchField;
