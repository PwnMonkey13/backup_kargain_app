import React, { useEffect, useState } from 'react';
import Tags from './Tags';
import PropTypes from 'prop-types';
import ValidationError from '../Form/Validations/ValidationError';

const TagsControlled = ({ name, rules, control, register, errors }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        control.register(name, rules);
        const tags = control.getValues(name);
        setTags(tags);
    }, []);

    return (
        <>
            <div className="d-flex flex-column">

                <input
                    name="test"
                    type="text"
                    // ref={(e) => register(e, rules)}
                />

                <Tags
                    defaultTags={tags}
                    onChange={tags => {
                        setTags(tags);
                        control.setValue(name, tags);
                    }}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

TagsControlled.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.any.isRequired,
    defaultValues: PropTypes.arrayOf(PropTypes.string),
    maxTags: PropTypes.number,
};

TagsControlled.defaultProps = {
    fireTags: () => {
    },
};

export default TagsControlled;
