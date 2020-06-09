import React from 'react';
import useTranslation from 'next-translate/useTranslation';

export default () => {
    const { t, lang } = useTranslation();
    return (
        <div>
            <p> {lang}</p>
        </div>
    );
}
