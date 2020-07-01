import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({}));

const TabsItem = ({ activeTab, index, ...props }) => {
    const classes = useStyles();

    return (
        <div id={props.id} className={clsx('tab-pane', 'fade',
            { show: index === activeTab },
            { active: index === activeTab },
            props.className)}>
            {props.children}
        </div>
    );
};

const Tabs = ({ defaultActive, children, id }) => {
    const [activeTab, setActiveTab] = useState(defaultActive || 0);
    const tabs = !Array.isArray(children) ? [children] : children;

    const onClickTabItem = (index) => {
        setActiveTab(index);
    };

    return (
        <section className="tabs">
            <ul className="nav nav-tabs m-2 justify-content-center" id={id}>
                {tabs && tabs.map((item, index) => {
                    if (!item) return null;
                    const { title, img } = item.props;

                    return (
                        <li key={index}
                            className={clsx('nav-link', { active: index === activeTab })}
                            data-toggle="tab"
                            role="tab"
                            aria-selected={activeTab === index}
                            onClick={() => onClickTabItem(index)}>
                            <label>{title}</label>
                            {img && <img src={img} alt={title}/>}
                        </li>
                    );
                })}
            </ul>

            <div className="tab-content">
                {tabs && tabs.map((item, index) => {
                    return <TabsItem
                        key={index}
                        index={index}
                        activeTab={activeTab}
                        {...item.props}
                    />;
                })}
            </div>
        </section>
    );
};

Tabs.Item = TabsItem;

export default Tabs;
