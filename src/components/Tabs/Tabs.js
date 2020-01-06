import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Tabs = ({ children, ...props }) => {
    const [ activeTab, setActiveTab ] = useState(0);

    useEffect(() => {
        setActiveTab(props.active);
    }, [props.active]);

    const onClickTabItem = (index) => {
        setActiveTab(index);
    };

    return(
        <div>
            <ul className="nav nav-tabs">
                {children.map((item, index) => {
                    const { title } = item.props;
                    const classes = classNames(
                        'nav-item',
                        { 'active' : index === activeTab }
                    );

                    return(
                        <li key={index} className={classes}
                            onClick={() => onClickTabItem(index)}>
                            <label>{title}</label>
                            <img src="images/tab-car.png" alt=""/>
                        </li>
                    );
                })}
            </ul>

            <div className="tab-content" id="myTabContent">
                { children.map((item, index) => {
                    const classes = classNames(
                        'tab-pane',
                        'fade',
                        { 'show': index === activeTab },
                        { 'active': index === activeTab },
                    );
                    return (
                        <div key={index} className={classes}>
                            {item.props.children}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tabs;
