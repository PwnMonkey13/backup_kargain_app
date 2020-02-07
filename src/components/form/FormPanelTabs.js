import React from 'react';
import useForm from '../../hooks/useForrm';
import classNames from 'classnames';
import SwitchField from "./SwitchFields";

function FormPanelTabs({className, btnName, model}) {
    const classnames = classNames(className);

    return (
        <form className={classnames} onSubmit={setSubmit}>
            <div className="fields">
                {model.tabs((tab, index) => {

                })}
            </div>
        </form>
    )
}

export default FormPanelTabs;
