import {useState, useEffect, useContext } from 'react';
import {set as _set, get as _get} from "lodash";
import CompleteInput from "../components/form/Validations/CompleteInput";

const useForm = (model = [], values = {}, submitCallback) => {
    const config = model.config;
    const [fields, setFields] = useState(model.fields);
    const inputs = extractInputs(fields);
    const [ message, setMessage ] = useState('');

    function extractInputs(fields){
        return fields.reduce((carry, field) => {
            if (field.fields) {
                return [...carry, ...extractInputs(field.fields)]
            } else if (field.componentType === 'input') {
                if(config.autoFill) field.value = _get(values, field.name, field.value);
                return [...carry, CompleteInput(field)];
            } else return carry;
        }, []);
    }

    const buildUpdatedFields = (fields, input) => {
        return fields.map(field => {
            if (field.fields) return {...field, fields: buildUpdatedFields(field.fields, input)};
            return input && input.name === field.name ? {...field, ...input} : field;
        });
    };

    const updateFields = (input) => {
        if(input) setFields(fields => buildUpdatedFields(fields, input));
    };

    const handleChange = (name, value) => {
        let input = inputs.find(i => i.name === name);
        if(!input) return;
        if(input.name === name) input.value = value;
        parseInput(input);
        validateInput(input);
        updateFields(input);
    };

    const handleSubmit = e => {
        e.preventDefault();
        inputs.forEach(i => validateInput(i));
        let alerts = inputs.filter(i => i.alert);
        if(alerts.length){
            setMessage("Some fields are invalid or required");
            updateFields();
        }
        else prepareSubmit(e, inputs);
    };

    const prepareSubmit = (e, inputs) => {
        const form = inputs.reduce((carry, input) => {
            if(input.value){
                carry[input.name] = input.value;
            }
            return carry;
        }, {});

        const formated = Object.entries(form).reduce((res, [path, val]) => {
            _set(res, path, val);
            return res;
        }, {});

        submitCallback(e, formated);
    };

    const parseInput = input => input.value = input.parseFun ? input.parseFun(input.value) : input.value;

    const validateInput = input => {
        let alert = null;
        input.validators && input.validators.forEach(v => alert = v.isValidFun && !v.isValidFun(input.value) ? v.alert : alert);

        if (input.match) {
            const matchEl = fields.find(el => el.id === input.match.id);
            if (matchEl && matchEl.value !== input.value) {
                alert = input.match.alert;
            }
        }
        input.alert = alert;
    };

    return [ fields, message, handleChange, handleSubmit ];
};

export default useForm;
