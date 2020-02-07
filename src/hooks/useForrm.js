import {useState, useEffect} from 'react';

const resolve = (path, obj = self, separator = '.') => {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
};

const extractInputs = (fields, inputs = []) => {
    return fields.reduce((carry, field) => {
        if (field.componentType === 'group') {
            return [...carry, ...extractInputs(field.fields, inputs)]
        } else if (field.componentType === 'input') {
            return [...carry, field];
        } else return carry;
    }, inputs);
};

const useForm = (model, values, submitCallback) => {
    const [fields, setFields] = useState(model);
    const [ message, setMessage ] = useState('');
    const inputs = extractInputs(fields);

    useEffect(() => {
        inputs.forEach(input => input.value = input.linked ? resolve(input.linked, values) : input.value);
        setFields(fields.map(field => {
            if (field.componentType !== "input") return field;
            else return inputs.find(input => input.name === field.name);
        }));
    }, []);

    const handleChange = (name, value) => {
        let input = inputs.find(input => input.name === name);
        if (!input) return;
        input.value = value;

        parseInput(input);
        validateInput(input);

        let updatedFields = fields.map(field =>
            field.componentType !== "input" ? field : inputs.find(input => input.name === field.name));

        setFields(updatedFields);
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
        const data = inputs.reduce((carry, input) => {
            if(input.value) carry[input.name] = input.value;
            return carry;
        }, {});
        submitCallback(e, data);
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
