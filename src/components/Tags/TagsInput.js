import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

const TagsInput = ({ fireTags }) => {
    const tagInput = useRef();
    const [tags, setTags] = React.useState([
        'Tags',
        'Input',
    ]);

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const inputKeyDown = (e) => {
        const val = e.target.value;

        if(e.key === 'Enter'){
            e.preventDefault()
            e.stopPropagation()
        }

        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            tagInput.current.value = null;
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };

    useEffect(() => {
        fireTags(tags);
    }, [tags]);

    return (
        <div className="input-tag">
            <ul className="input-tag__tags">
                {tags.map((tag, i) => (
                    <li key={tag}>
                        {tag}
                        <button type="button" onClick={() => {
                            removeTag(i);
                        }}>+
                        </button>
                    </li>
                ))}
                <li className="input-tag__tags__input">
                    <input
                        type="text"
                        onKeyDown={inputKeyDown}
                        ref={tagInput}
                    />
                </li>
            </ul>
        </div>
    );
};


TagsInput.propTypes = {
    fireTags: PropTypes.func.isRequired
}

TagsInput.defaultProps = {
    fireTags: () => {}
}
export default TagsInput;
