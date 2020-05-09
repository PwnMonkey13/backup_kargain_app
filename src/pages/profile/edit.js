import React, { useState, useContext } from 'react'
import clsx from 'clsx'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import UsersService from '../../services/UsersService'
import { useAuth } from '../../context/AuthProvider';
import { ModalDialogContext } from '../../context/ModalDialogContext'

const Edit = (props) => {
    const { authenticatedUser, setAuthenticatedUser } = useAuth()
    const { dispatchModal } = useContext(ModalDialogContext)
    const [user, setUser] = useState(authenticatedUser)
    const [state, setState] = useState({
        alertText: null,
        alertStyle: null,
        activeTab: 1
    })

    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({ ...state, activeTab: tab })
        }
    }

    //TODO
    const handleSubmit = async (e, data) => {
        UsersService.updateUser(user.username, data, props.token)
            .then(updatedUser => {
                setUser(updatedUser)
                setAuthenticatedUser(updatedUser)
                dispatchModal({ type: 'success', msg: 'User successufully updated' })
            }).catch(err => {
                dispatchModal({ type: 'error', err })
            })
    }

    return (
        <Row className="mt-4">
            <Col xs="12" md="4" lg="4">
                <Nav tabs vertical>
                    <NavItem>
                        <NavLink
                            className={clsx( state.activeTab === 1 && 'active')}
                            onClick={() => toggle(1)}>
                            Compte
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={clsx( state.activeTab === 2 && 'active')}
                            onClick={() => toggle(2)}>
                            Abonnements
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classNames({ active: state.activeTab === 3 })}
                            onClick={() => toggle(3)}>
                            Paiements & factures
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classNames({ active: state.activeTab === 4 })}
                            onClick={() => toggle(4)}>
                            Aide & contact
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
            <Col xs="12" md="8" lg="8">
                <TabContent activeTab={state.activeTab}>
                    <TabPane tabId={1}>
                        <h2>Mes informations</h2>
                    </TabPane>
                    <TabPane tabId={2}>
                        <h2>Abonnements</h2>
                    </TabPane>
                    <TabPane tabId={2}>
                        <h2>Paiements & Factures</h2>
                    </TabPane>
                    <TabPane tabId={2}>
                        <h2>Aide & Contact</h2>
                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    )
}

export default Edit
