import React, { useState, useEffect, useContext } from 'react'
import {useRouter} from "next/router";
import classNames from 'classnames';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import model from '../../components/form/Models/profile.edit.model';
import FormPanel from '../../components/form/FormPanel';
import {UserContext} from "../../components/Context/UserContext";
import UsersService from '../../services/UsersService'
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";

const Edit = (props) => {
    const router = useRouter();
    const { session, dispatch } = useContext(UserContext);
    const [ state, setState] = useState({
        user : session.user,
        alertText: null,
        alertStyle: null,
        activeTab : 1,
    });

    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab
            });
        }
    };

    const handleSubmit = async (e, inputs) => {
        console.log(e);
        console.log(inputs);
        // e.preventDefault();
        // const state = model.reduce((carry, m) => { return { ...carry, [m.name] : m.value }}, {});
        // setState({
        //     alertText: null,
        //     alertStyle: null
        // });

        // UsersService.updateUser(state.user)
        //     .then(data => {
        //         setState({
        //             alertText: 'Changes to your profile have been saved',
        //             alertStyle: 'alert-success',
        //         });
        //     }).catch(err =>{
        //         setState({
        //             alertText: err,
        //             alertStyle: 'alert-danger',
        //         }
        //     );
        // })
    };

    return(
        <Layout>
            <Row className="mt-4">
                <Col xs="12" md="4" lg="4">
                    <Nav tabs vertical>
                        <NavItem>
                            <NavLink
                                className={classNames({active: state.activeTab === 1})}
                                onClick={() => toggle(1)}>
                                Compte
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classNames({active: state.activeTab === 2})}
                                onClick={() => toggle(2)}>
                                Abonnements
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classNames({active: state.activeTab === 3})}
                                onClick={() => toggle(3)}>
                                Paiements & factures
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classNames({active: state.activeTab === 4})}
                                onClick={() => toggle(4)}>
                                Aide & contact
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs="12" md="8" lg="8">
                    <TabContent activeTab={state.activeTab}>
                        <TabPane tabId={1}>
                            <h4>Mes informations</h4>
                            <FormPanel
                                btnName="Enregistrer"
                                submitCallback={handleSubmit}
                                model={model}
                                values={state.user}
                            />
                        </TabPane>
                        <TabPane tabId={2}>
                            <h4>Tab 2 Contents</h4>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </Layout>
    )
};

export default Edit;
