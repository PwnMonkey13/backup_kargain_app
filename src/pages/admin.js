import React, { useState, useEffect } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Layout from '../layouts/Layout'
import Loader from '../components/loader'

const Admin = (props) => {
    const [ data, setData ] = useState({ users : []});
    const [ options, setOptions ] = useState({
        page: 1,
        pageStartIndex: 1,
        paginationPosition: 'top',
        paginationSize: 5,
        sizePerPage: 10,
        sizePerPageList: [ 10, 50, 100 ]
    });

    if (!props.session || !props.session.user || props.session.user.admin !== true){
        return <p> Admin Required </p>
    }

    else{
        const users = data.users || [];
        const totalSize = data.total || 0;

        return (
            <Layout>
                <h1 className="display-4">Administration</h1>
                <p className="lead text-muted ">
                    This is an example read-only admin page which lists user accounts.
                </p>
                <Table
                    data={users}
                    totalSize={totalSize}
                    options={options} />
            </Layout>
        )
    }
};

const Table = ({ totalSize, ...props }) => {
    if (typeof window === 'undefined')
        return (<p>This page requires JavaScript.</p>);

    if (!props.data || props.data.length < 1)
        return (<Loader/>);

    const n = props.options.page * props.options.sizePerPage;
    const numberTo = ( n < totalSize ) ? n : totalSize;
    const numberFrom = numberTo - props.data.length + 1;
    return (
        <React.Fragment>
            <BootstrapTable pagination hover bordered={false}
                            remote={true}
                            data={props.data}
                            fetchInfo={ {dataTotalSize: totalSize} }
                            options={ props.options }>
                <TableHeaderColumn isKey dataField="_id">ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
            </BootstrapTable>
            <p className="mt-2 text-muted text-right">
                Displaying <strong>{numberFrom}-{numberTo}</strong> of <strong>{totalSize}</strong>
            </p>
        </React.Fragment>
    )
};

export default Admin;
