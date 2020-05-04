import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Header from '../Header';

const useStyles = makeStyles(theme => ({
    annoInputs: {
        backgroundColor: '#e9ecef',
        border: '1px solid gainsboro',
        textAlign: 'center',
        marginTop: '2rem',
        overflowX: 'auto',
    },

    annoContainer: {
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        maxWidth: '500px',
    },

    annoStage: {
        position: 'relative',
        width: '100%',
        marginTop: '1rem',
    },

    annoImg: {
        objectFit: 'contain',
        width: '100%',
        border: '1px solid',
    },

    annoInput: {
        display: 'flex',
        justifyContent: 'left',
        alignContent: 'center',
        margin: '.6rem .4rem',
    },

    annoFloatingNumber: {
        position: 'absolute',
        cursor: 'default',
        marginLeft: '-.5rem',
        marginTop: '-.5rem',
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
        display: 'inline-block',
    },

    annoInputField: {},

}));

const DamageViewerTabs = ({ tabs, ...props }) => {
    const classes = useStyles();
    const warningDamageRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    let annoRefs = [];

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const DamagesMappedImg = ({ tab, index }) => (
        <div className={clsx(classes.annoContainer)}>
            <div className={clsx(classes.annoStage)}
                 id={`anno_${index}`}
                 ref={annoRef => annoRefs[index] = annoRef}
            >
                <img className={clsx(classes.annoImg)} src={tab.img} alt={tab.alt}/>

                {tab.stages && tab.stages.map((stage, index) => (
                    <span key={index}
                          style={{ ...stage.position }}
                          className={clsx(classes.annoFloatingNumber, classes.annoNumber)}>
                        {index + 1}
                    </span>
                ))}
            </div>
        </div>
    );

    const DamagesList = ({ tab }) => (
        <div className={clsx(classes.annoInputs)}>
            <Header h3> Dégats :</Header>
            {tab.stages && tab.stages.map((stage, index) => {
                return (
                    <div key={index} className={classes.annoInput}>
                        <div style={{ flex: 1 }}>
                            <span className={clsx(classes.annoNumber)}>{index + 1}</span>
                        </div>
                        <div style={{
                            margin: 'auto',
                            flex: 3,
                        }}>
                            <input type="text"
                                   readOnly
                                   value={stage.input}
                                   className={clsx(classes.annoInputField, 'form-control form-control-sm')}
                                   name={`annotation_${index + 1}`}
                                   placeholder={`Description du défaut ${index + 1} du véhicule`}
                            />
                        </div>

                    </div>
                );
            })}
        </div>
    );

    return (
        <div>
            <Nav tabs>
                {Object.keys(tabs).map((key, index) => {
                    const tab = tabs[key];
                    return (
                        <NavItem key={index}>
                            <NavLink
                                className={classnames({ active: activeTab === index })}
                                onClick={() => {
                                    toggle(index);
                                }}
                            >
                                {tab.title}
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>

            <TabContent ref={warningDamageRef} activeTab={activeTab}>
                {Object.keys(tabs).map((key, index) => {
                    const tab = tabs[key];

                    return (
                        <TabPane key={index} tabId={index}>
                            <Row>
                                <Col md={6}>
                                    <DamagesMappedImg index={index} tab={tab} />
                                </Col>
                                <Col md={6}>
                                    <DamagesList tab={tab}/>
                                </Col>
                            </Row>
                        </TabPane>
                    );
                })}
            </TabContent>
            {props.enableDebug && (
                <pre>{JSON.stringify(damages, null, 2)}</pre>
            )}
        </div>
    );
};

DamageViewerTabs.propTypes = {
};

DamageViewerTabs.defaultProps = {
};

export default DamageViewerTabs;
