import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NiceSelect from 'react-select';
import useTranslation from 'next-translate/useTranslation';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

const DamagesNav = memo(({ activeTab, setActiveTab, damagesTabsLight }) => {
    const theme = useTheme();
    const { t, lang } = useTranslation();

    const isUpTablet = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });
    return (
        <div className="annoNav">
            {isUpTablet ? (
                <ul className="nav nav-tabs">
                    {damagesTabsLight && damagesTabsLight.map((tab, indexTab) => {
                        return (
                            <li key={indexTab} className={clsx('nav-item')}>
                                <a className={clsx('nav-link', activeTab === indexTab && 'active')}
                                   onClick={() => {
                                       setActiveTab(indexTab);
                                   }}>
                                    {t(`vehicles:${tab.title}`)}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <NiceSelect
                    options={damagesTabsLight && damagesTabsLight.map((tab, index) => ({
                        value: index,
                        label: `${tab.title} (${tab.countStages})`,
                    }))}
                    onChange={({ value }) => {
                        setActiveTab(value);
                    }}

                />
            )}
        </div>
    );
});

DamagesNav.propTypes = {
    activeTab: PropTypes.number.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    damagesTabsLight: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        countStages: PropTypes.number,
    })),
};

DamagesNav.defaultProps = {
    activeTab : 0,
    damagesTabsLight : []
}
export default DamagesNav;

