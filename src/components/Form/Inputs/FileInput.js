import React from 'react';
import ValidationAlert from '../Validations/ValidationAlert';

/* list of supported file types */
const FileAcceptTypes = (types = []) => types.map(function(x) { return '.' + x; }).join(',');

function TextInput({ name, required, disabled, label, type, value, alert, setInputs, ...props }) {
    return (
        <React.Fragment>
            <div className="label">
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required_label">*</span>}
                </label>            </div>
            <div className="input">
                <input
                    id={name}
                    name={name}
                    type={type}
                    accept={FileAcceptTypes(props.types)}
                    value={value || ""}
                    required={required || false}
                    disabled={disabled || false}
                    onChange={setInputs}
                    className={alert ? 'form-danger' : ''}
                />
                <ValidationAlert content={alert} />
            </div>

        </React.Fragment>
    )
}

export default TextInput;
