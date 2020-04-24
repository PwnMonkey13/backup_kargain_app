import React, { useRef, useState } from 'react'
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

const DamageSelector = ({tabs , maxDamages : maxDamagesProp, ...props}) => {
    const classes = useStyles()
    const warningDamageRef = useRef(null)
    const [activeTab, setActiveTab] = useState(0)
    let annoRefs = [];
    const [damages, setDamages] = useState(tabs.reduce((carry, item)=>({...carry, [item.key] : ({...item, stages : []}) }),{}))

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    const getClick = (e, index) => {
        const annoRef = annoRefs[index];
        const tabKey = tabs[activeTab].key;
        const max = tabs[activeTab].max || maxDamagesProp;
        const stages = damages[tabKey].stages;

        if(stages.length >= max){
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

        setDamages(damages => ({...damages, [tabKey] : {...damages[tabKey], stages : [...damages[tabKey].stages, stage] } }))
    }

    const rmStage = (index) => {
        const tabKey = tabs[activeTab].key;
        let stages = damages[tabKey].stages;
        stages = stages.slice(0, index).concat(stages.slice(index + 1, stages.length));
        setDamages(damages => ({...damages, [tabKey] : {...damages[tabKey], stages } }))
    };

    const onInputStageChange = (value, tabKey, stageIndex) => {
        let stages = damages[tabKey].stages;
        stages[stageIndex].input = value;
        setDamages(damages => ({...damages, [tabKey] : {...damages[tabKey], stages } }))
    };

    return (
        <div>
            <Nav tabs>
                {tabs.map((tab, index) => {
                    return (
                        <NavItem key={index}>
                            <NavLink
                                className={classnames({ active: activeTab === index })}
                                onClick={() => {
                                    toggle(index)
                                }}
                            >
                                {tab.title}
                            </NavLink>
                        </NavItem>
                    )
                })}
            </Nav>

            <TabContent ref={warningDamageRef} activeTab={activeTab}>
                {tabs.map((tab, index) => {
                    const tabKey = tabs[activeTab].key;
                    const stages = damages[tabKey].stages;
                    const max = tabs[activeTab].max || maxDamagesProp;
                    return (
                        <TabPane key={index} tabId={index}>
                            <Row>
                                <Col md={6}>
                                    <div className={clsx(classes.annoContainer)}>
                                        <div className={clsx(classes.annoStage)}
                                             id={`anno_${index}`}
                                             ref={annoRef => annoRefs[index] = annoRef}
                                             onClick={(e) => getClick(e, index)}
                                        >
                                            <img className={clsx(classes.annoImg)} src={tab.img} alt={tab.alt}/>

                                            {stages.map((stage, index) => (
                                                <span key={index}
                                                      style={{ ...stage.position }}
                                                      className={clsx(classes.annoFloatingNumber, classes.annoNumber)}>
                                                    {index+1}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className={clsx(classes.annoInputs)}>
                                        <Header h3> Dégats :</Header>
                                        {stages.length === 0 && <Header p> (Cliquez sur l'image)</Header>}
                                            { stages.length >= max &&  <Alert color="warning">Max {max} damages</Alert> }
                                        {stages.map((stage, index) => {
                                            return (
                                                <div key={index} className={classes.annoInput}>
                                                    <div style={{flex : 1}}>
                                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => rmStage(index)}>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                        <span className={clsx(classes.annoNumber)}>{index+1}</span>
                                                    </div>
                                                    <div style={{ margin : 'auto', flex : 3}}>
                                                        <input type="text"
                                                               value={stage.input || ""}
                                                               onChange={(e) => onInputStageChange(e.target.value, tabKey, index)}
                                                               className={clsx(classes.annoInputField, 'form-control form-control-sm')}
                                                               name={`annotation_${index+1}`}
                                                               placeholder={`Description du défaut ${index+1} du véhicule`}
                                                        />
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    )
                })}
            </TabContent>
            {props.enableDebug && (
                <pre>{JSON.stringify(damages, null, 2)}</pre>
            )}
        </div>
    )
}

DamageSelector.propTypes = {
    maxDamages : PropTypes.Number,
    enableDebug : PropTypes.Boolean
}

DamageSelector.defaultProps = {
    maxDamages : 10,
    enableDebug : false
}
export default DamageSelector
