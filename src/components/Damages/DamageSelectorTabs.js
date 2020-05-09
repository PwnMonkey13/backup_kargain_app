import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames'
import DeleteIcon from '@material-ui/icons/Delete';import clsx from 'clsx'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import {Row, Col, Alert } from 'reactstrap'
import Header from '../Header'

const useStyles = makeStyles(theme => ({
    annoInputs: {
        backgroundColor: '#e9ecef',
        border: '1px solid gainsboro',
        textAlign: 'center',
        marginTop: '2rem',
        overflowX: 'auto'
    },

    annoContainer : {
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        maxWidth: '500px'
    },

    annoStage : {
        position: 'relative',
        width: '100%',
        marginTop: '1rem',
    },

    annoImg : {
        objectFit: 'contain',
        width: '100%',
        border : '1px solid'
    },

    annoInput: {
        display : 'flex',
        justifyContent: 'left',
        alignContent: 'center',
        margin: '.6rem .4rem',
    },

    annoFloatingNumber: {
        position: 'absolute',
        cursor: 'default',
        marginLeft: '-.5rem',
        marginTop: '-.5rem'
    },

    annoNumber: {
        backgroundColor: '#dc3545',
        color: '#fff',
        fontSize: '.8rem',
        lineHeight: '1.4rem',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '50%',
        width: '1.4rem',
        height: '1.4rem',
        display: 'inline-block'
    },

    annoInputField: {
    }

}))

const scrollToRef = (ref, offsetTop = 0) => {
    return window.scrollTo(0, ref.current.offsetTop)
}

const getScrollTop = () => {
    return document.documentElement.scrollTop;
}

const getCoords = (elem) => { // crossbrowser version
    const box = elem.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;
    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top  = box.top +  scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

// interface tab = { title : String , key : String, alt : String, img : String }

const DamageSelectorTabs = ({tabs , maxDamages, onChange : fireChanges, ...props}) => {
    const classes = useStyles()
    const warningDamageRef = useRef(null)
    const [activeTab, setActiveTab] = useState(0)
    const [damagesTabs, setDamagesTabs] = useState(tabs)
    let annoRefs = [];

    useEffect(()=>{
        fireChanges(damagesTabs)
    },[damagesTabs])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    const getClick = (e, indexTab) => {
        const annoRef = annoRefs[indexTab];
        const max = tabs[activeTab].max || maxDamages;

        if(damagesTabs[indexTab].stages.length >= max){
            // scrollToRef(warningDamageRef);
            return
        }

        const x = e.nativeEvent.offsetX / annoRef.offsetWidth;
        const y = e.nativeEvent.offsetY / annoRef.offsetHeight;

        const stage = {
            position: {
                left: `${x * 100}%`,
                top:  `${y * 100}%`
            }
        }

        setDamagesTabs(damagesTabs =>
            damagesTabs.map((item, i) => {
                if(i === indexTab){
                    return {
                        ...item,
                        stages : [...item.stages, stage]
                    }
                }
                else return item
            }))
    }

    const rmStage = (indexTab, indexStage) => {
        setDamagesTabs(damagesTabs =>
            damagesTabs.map((item, i) => {
                if(i === indexTab){
                    return {
                        ...item,
                        stages : item.stages.slice(0, indexStage)
                            .concat(item.stages.slice(indexStage + 1, item.stages.length))
                    }
                }
                else return item
            })
        )
    };

    const onInputStageChange = (indexTab, stageIndex, value) => {
        setDamagesTabs(damagesTabs =>
            damagesTabs.map((item, i) => {
                if(i === indexTab){
                    return {
                        ...item,
                        stages : item.stages.map((stage, ii) => {
                            if (ii === stageIndex) {
                                return {
                                    ...stage,
                                    text: value
                                }
                            } else return stage
                        })
                    }
                } else return item
            })
        )
    };

    const DamagesPicker = ({ indexTab, damageTab }) => (
        <div className={clsx(classes.annoContainer)}>
            <div className={clsx(classes.annoStage)}
                 id={`anno_${indexTab}`}
                 ref={annoRef => annoRefs[indexTab] = annoRef}
                 onClick={(e) => getClick(e, indexTab)}
            >
                <img className={clsx(classes.annoImg)} src={damageTab.img} alt={damageTab.alt}/>

                {damageTab.stages && damageTab.stages.map((stage, indexStage) => (
                    <span key={indexStage}
                          style={{ ...stage.position }}
                          className={clsx(classes.annoFloatingNumber, classes.annoNumber)}>
                        {indexStage + 1}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <Nav tabs>
                {tabs.map((tab, indexTab) => {
                    return (
                        <NavItem key={indexTab}>
                            <NavLink
                                className={classnames({ active: activeTab === indexTab })}
                                onClick={() => {
                                    toggle(indexTab)
                                }}
                            >
                                {tab.title}
                            </NavLink>
                        </NavItem>
                    )
                })}
            </Nav>

            <TabContent ref={warningDamageRef} activeTab={activeTab}>
                {damagesTabs.map((damageTab, indexTab) => {
                    if(!damageTab.stages) damageTab.stages = []
                    const stages = damageTab.stages;
                    const max = damageTab.max || maxDamages;

                    return (
                        <TabPane key={indexTab} tabId={indexTab}>
                            <Row>
                                <Col md={6}>
                                    <DamagesPicker indexTab={indexTab} damageTab={damageTab} />
                                </Col>
                                <Col md={6}>
                                    <div className={clsx(classes.annoInputs)}>
                                        <Header h3> Dégats :</Header>
                                        {stages.length === 0 && <Header p> (Cliquez sur l'image)</Header>}
                                        {stages.length >= max && <Alert color="warning">Max {max} damages</Alert>}
                                        {stages.map((stage, indexStage) => {
                                            return (
                                                <div key={indexStage} className={classes.annoInput}>
                                                    <div style={{ flex: 1 }}>
                                                        <IconButton
                                                            aria-label="delete"
                                                            className={classes.margin}
                                                            tabIndex="-1"
                                                            onClick={() => rmStage(indexTab, indexStage)}>
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                        <span className={clsx(classes.annoNumber)}>{indexStage + 1}</span>
                                                    </div>
                                                    <div style={{
                                                        margin: 'auto',
                                                        flex: 3,
                                                    }}>
                                                        <input type="text"
                                                               value={stage.text || ''}
                                                               onChange={(e) => onInputStageChange(indexTab, indexStage, e.target.value)}
                                                               className={clsx(classes.annoInputField, 'form-control form-control-sm')}
                                                               name={`annotation_${indexStage + 1}`}
                                                               placeholder={`Description du défaut ${indexStage + 1} du véhicule`}
                                                        />
                                                    </div>

                                                </div>
                                            );
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    )
                })}
            </TabContent>
            {props.enableDebug && (
                <pre>{JSON.stringify(damagesTabs, null, 2)}</pre>
            )}
        </div>
    )
}

DamageSelectorTabs.propTypes = {
    maxDamages : PropTypes.number,
    enableDebug : PropTypes.bool
}

DamageSelectorTabs.defaultProps = {
    maxDamages : 10,
    enableDebug : false,
}
export default DamageSelectorTabs
