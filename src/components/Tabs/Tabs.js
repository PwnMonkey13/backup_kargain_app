import React, { useState } from 'react'
import classNames from 'classnames'

const TabsItem = ({ activeTab, index, ...props }) => {
    const classes = classNames(
        'tab-pane',
        'fade',
        { show: index === activeTab },
        { active: index === activeTab },
        props.className
    )

    return (
        <div className={classes} id={props.id}>
            {props.children}
        </div>
    )
}

const Tabs = ({ defaultActive, children, classname, id, ...props }) => {
    const [activeTab, setActiveTab] = useState(defaultActive || 0)

    const onClickTabItem = (index) => {
        setActiveTab(index)
    }

    const Classnames = classNames(
        'nav nav-tabs',
        classname
    )

    return (
        <section className="tabs">
            <ul className={Classnames} id={id}>
                {children.map((item, index) => {
                    const { title, img } = item.props
                    const classes = classNames(
                        'nav-item',
                        { active: index === activeTab }
                    )

                    return (
                        <li key={index}
                            className={classes}
                            data-toggle="tab"
                            role="tab"
                            aria-selected={activeTab === index}
                            onClick={() => onClickTabItem(index)}>
                            <label>{title}</label>
                            { img && <img src={img} alt={title}/> }
                        </li>
                    )
                })}
            </ul>

            <div className="tab-content tab-content-profile" id="myTabContent">
                { children.map((item, index) => {
                    return <TabsItem key={index} index={index} activeTab={activeTab} {...item.props}/>
                })}
            </div>
        </section>
    )
}

Tabs.Item = TabsItem

export default Tabs
