import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { Col, Row, TabContent, TabPane } from 'reactstrap';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from '../Header';
import DamagesNavResponsive from './DamagesNavResponsive';

const useStyles = makeStyles(() => ({
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

const DamageViewerTabs = ({ tabs }) => {
    const warningDamageRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    let annoRefs = [];

    return (
        <section className="anno">
            <DamagesNavResponsive
                {...{
                    damagesTabsLight: tabs && tabs.map(tab => ({
                        title: tab.key,
                        countStages: tab.stages.length,
                    })),
                    activeTab,
                    setActiveTab,
                }}
            />

            <TabContent ref={warningDamageRef} activeTab={activeTab}>
                {Object.keys(tabs).map((key, index) => {
                    const tab = tabs[key];

                    return (
                        <TabPane key={index} tabId={index}>
                            <Row>
                                <Col md={6}>
                                    <DamagesMappedImg {...{index, tab, annoRefs}}/>
                                </Col>
                                <Col md={6}>
                                    <DamagesList tab={tab}/>
                                </Col>
                            </Row>
                        </TabPane>
                    );
                })}
            </TabContent>
        </section>
    );
};

const DamagesMappedImg = ({ tab, index, annoRefs }) => {
    const classes = useStyles();
    return (
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
};

const DamagesList = ({ tab }) => {
    const classes = useStyles();
    const { t, lang } = useTranslation();

    return (
        <div className={clsx(classes.annoInputs)}>
            <Header h3> {t('vehicles:damages')} :</Header>
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
                                   placeholder={t('vehicles:damages-{number}-description', { number : index + 1})}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

DamageViewerTabs.propTypes = {};

DamageViewerTabs.defaultProps = {};

export default DamageViewerTabs;
