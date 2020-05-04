import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TagsInput from '../../components/Tags/TagsInput';

export default ({ name, rules, control, errors, ...props }) => {

    const getTags = (tags) => {
        control.setValue(name, tags);
    };

    useEffect(() => {
        control.register(name, []);
    }, []);

    return (
        <div>
            <CssBaseline/>
            <TagsInput
                fireTags={getTags}
            />
        </div>
    );
}
