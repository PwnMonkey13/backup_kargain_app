import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import UsersService from '../../services/UsersService'
import { UserContext } from '../../components/Context/UserContext'
import { ModalDialogContext } from '../../components/Context/ModalDialogContext'

const Edit = (props) => {
    const { session, dispatchUser } = useContext(UserContext)
    const { dispatchModal } = useContext(ModalDialogContext)
    const [user, setUser] = useState(session.user)
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

    const handleSubmit = async (e, data) => {
        UsersService.updateUser(user.username, data, props.token)
            .then(document => {
                console.log(document)
                setUser(document)
                dispatchUser(document)
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
                            className={classNames({ active: state.activeTab === 1 })}
                            onClick={() => toggle(1)}>
                            Compte
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classNames({ active: state.activeTab === 2 })}
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
