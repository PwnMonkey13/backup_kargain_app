import React from 'react';
import clsx from 'clsx';

const CTAButton = ({ title, id, className, submit }) => {
    return (
        <button
            id={id}
            className={clsx(className, 'btn btn-outline-primary')}
            type={submit ? "submit" : "button"}>
            {title}
        </button>
    );
};

export default CTAButton;
