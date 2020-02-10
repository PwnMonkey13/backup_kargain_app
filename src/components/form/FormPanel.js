import React from 'react';
import useForm from '../../hooks/useForm';
import classNames from 'classnames';
import SwitchField from "./SwitchFields";

function FormPanel({className, btnName, submitCallback, values, model}) {
    const [fields, message, setFields, setSubmit] = useForm(model, values, submitCallback);
    const classnames = classNames(className);

    return (
        <form className={classnames} onSubmit={setSubmit}>
            <div className="fields">
                {fields.map((field, index) =>
                    field !== undefined && <SwitchField key={index} field={field} setInputs={setFields}/>
                )}
                <div className="submit">
                    <button className="btn btn-outline-primary" type="submit">{btnName}</button>
                </div>

                { message && <p> { message } </p> }
            </div>
        </form>
    )
}

export default FormPanel;
