import {useState, useEffect } from 'react';
import CompleteInput from "../components/form/Validations/CompleteInput";
import {set as _set, get as _get} from "lodash";

const extractInputs = (fields, inputs = []) => {
    return fields.reduce((carry, field) => {
        if (field.componentType === 'group') {
            return [...carry, ...extractInputs(field.fields, inputs)]
        } else if (field.componentType === 'input') {
            return [...carry, CompleteInput(field)];
        } else return carry;
    }, inputs);
};

const updatedFields = (fields, inputs) => {
    return fields.map(field => {
        if (field.componentType === "group") return {...field, fields : updatedFields(field.fields, inputs)};
        else if (field.componentType === "input") return inputs.find(input => input.name === field.name);
        else return field;
    });
};

const useForm = (model, values, submitCallback) => {
    const { config } = model;
    const [fields, setFields] = useState(model.fields);
    const [ message, setMessage ] = useState('');
    const inputs = extractInputs(fields);

    useEffect(() => {
        if (values && config.autoFill) inputs.forEach(input => {
            input.value = _get(values, input.name, input.value);
        });
        setFields(updatedFields(fields, inputs));
    },[]);

    const handleChange = (name, value) => {
        let input = inputs.find(input => input.name === name);
        if (!input) return;
        input.value = value;

        parseInput(input);
        validateInput(input);

        setFields(updatedFields(fields, inputs));
    };

    const handleSubmit = e => {
        e.preventDefault();
        inputs.forEach(i => validateInput(i));
        let alerts = inputs.filter(i => i.alert);
        if(alerts.length){
            setMessage("Some fields are invalid or required");
            setFields([...fields]);
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
