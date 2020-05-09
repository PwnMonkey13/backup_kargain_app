import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import UsersService from '../../../services/UsersService'
import TableMUI from '../TableMUI'
import BulletPoint from '../../BulletPoint'
import TablePaginationActions from '../../TablePaginationActions'
import { ModalDialogContext } from '../../../context/ModalDialogContext';

const BooleanBullet = (value) => {
    if(value) return <BulletPoint tooltipHelper="Payé" color="green"/>;
    return <BulletPoint tooltipHelper="Refusé" color="red"/>;
};

const UsersTable = () => {
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [rowsLength, setRowsLength] = useState(60)
    const [resultFetch, setResultsFetch] = React.useState({
        rows : [],
        total : 0
    })

    const columns = React.useMemo(() => [
        {
            title: 'ID',
            render: rowData => rowData.tableData.id + 1
        },
        {
            title: 'Avatar',
            field: 'avatar',
            filtering: false,
            grouping: false,
            searchable: false,
            render: rowData => <img src={rowData.avatar} style={{width: 40, borderRadius: '50%'}} alt=""/>
        },
        {
            title: 'First Name',
            field: 'firstname',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true
        },
        {
            title: 'Last Name',
            field: 'lastname',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true
        },
        {
            title: 'Username',
            field: 'username',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true
        },
        {
            title: 'Email',
            field: 'email',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true
        },
        {
            title: "validé",
            type : 'boolean',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => BooleanBullet(row.activated),
        },
        {
            title: "Activé",
            field: 'status',
            type : 'boolean',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => BooleanBullet(row.email_validated),
        },
        {
            title: "Pro",
            type : 'boolean',
            field: 'pro',
            emptyValue : 'false',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: rowData => rowData.pro && <CheckIcon/>
        },
        {
            title: "Nombre d`'annnonces",
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true
        },
    ], [])

    const handleItemClick = (e, user) => {
        if(user) router.push(`/admin/users/${user.username}`)
        else console.log("not found");
    };

    const handleChangePageIndex = (pageIndex) => {
        setPageIndex(pageIndex);
    }

    const fetchData = React.useCallback(() => {
        setLoading(true);

        UsersService.getUsers({size : rowsLength, page : pageIndex })
            .then(data => {
                setResultsFetch(data)
                setLoading(false)
            }).catch(err => {
            dispatchModalError({err, persist : true})
        })
    }, [rowsLength, pageIndex])

    useEffect(() => {
        fetchData();
    }, [pageIndex]);

    return (
        <>
            <TableMUI
                loading={loading}
                data={resultFetch.rows}
                tableLength={3}
                columns={columns}
                title="Utilisateurs Kargain"
                actions={[
                    {
                        icon: AddIcon,
                        tooltip: 'Ajouter un utilisateur',
                        isFreeAction: true,
                        onClick: (event, rowData) => router.history.push('/admin/users/new')
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Modifier',
                        onClick: (e, data) => handleItemClick(e, data)
                    }
                ]}
            />

            {!loading && resultFetch.total && (
                <TablePaginationActions
                    count={500}
                    page={pageIndex}
                    rowsPerPage={rowsLength}
                    onChangePage={handleChangePageIndex}
                />
            )}
        </>
    )
}

export default UsersTable
