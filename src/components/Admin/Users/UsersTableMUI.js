import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UsersService from '../../../services/UsersService';
import TableMUI from '../TableMUI';
import BulletPoint from '../../BulletPoint';
import TablePaginationActions from '../../TablePaginationActions';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import UserModel from '../../../models/user.model';

const BooleanBullet = (value) => {
    if (value) return <BulletPoint tooltipHelper="Payé" color="green"/>;
    return <BulletPoint tooltipHelper="Refusé" color="red"/>;
};

const UsersTable = () => {
    const router = useRouter();
    const { dispatchModalError } = useContext(ModalDialogContext);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsLength, setRowsLength] = useState(60);
    const [resultFetch, setResultsFetch] = useState({
        rows: [],
        total: 0,
    });

    const columns = React.useMemo(() => [
        // {
        //     title: 'ID',
        //     render: rowData => rowData.tableData.id + 1,
        // },
        {
            title: 'Avatar',
            field: 'avatar',
            filtering: false,
            grouping: false,
            searchable: false,
            render: userModel => {
                return (
                    <img src={userModel.getAvatar} style={{
                        width: 40,
                        borderRadius: '50%',
                    }} alt=""/>
                );
            },
        },
        {
            title: 'Role',
            filtering: true,
            grouping: true,
            searchable: true,
            render: userModel => userModel.getRole,

        },
        {
            title: 'First Name',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getFirstname,

        },
        {
            title: 'Last Name',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getLastname,

        },
        {
            title: 'Username',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getUsername,

        },
        {
            title: 'Email',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getEmail,

        },
        {
            title: 'validé',
            type: 'boolean',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: userModel => BooleanBullet(userModel.getIsActivated),
        },
        {
            title: 'Activé',
            field: 'status',
            type: 'boolean',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: userModel => BooleanBullet(userModel.getIsEmailValidated),
        },
        {
            title: 'Pro',
            type: 'boolean',
            filtering: true,
            grouping: true,
            sorting: true,
            searchable: true,
            render: userModel => BooleanBullet(userModel.isPro),
        },
        {
            title: 'Nombre d`\'annnonces',
            filtering: false,
            grouping: false,
            searchable: false,
            sorting: true,
            render: userModel => userModel.getGarage.length,
        },
    ], []);

    const handleItemClick = (e, userModel) => {
        if (userModel) router.push(userModel.getProfileEditLink);
    };

    const handleChangePageIndex = (pageIndex) => {
        setPageIndex(pageIndex);
    };

    const fetchData = React.useCallback(() => {
        setLoading(true);

        UsersService.getUsers({
            size: rowsLength,
            page: pageIndex,
        })
            .then(data => {
                const { rows } = data;
                const rowsModel = rows.map(row => new UserModel(row));
                setResultsFetch({
                    ...data,
                    rows: rowsModel,
                });
                setLoading(false);
            }).catch(err => {
            dispatchModalError({ err });
        });
    }, [rowsLength, pageIndex]);

    useEffect(() => {
        fetchData();
    }, [pageIndex]);

    return (
        <>
            <TableMUI
                loading={loading}
                data={resultFetch.rows}
                columns={columns}
                pageSize={resultFetch.rows.length}
                title="Utilisateurs Kargain"
                actions={[
                    {
                        icon: AddIcon,
                        tooltip: 'Ajouter un utilisateur',
                        isFreeAction: true,
                        onClick: (event, rowData) => router.history.push('/admin/users/new'),
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Modifier',
                        onClick: (e, userModel) => handleItemClick(e, userModel),
                    },
                ]}
            />

            {!loading && resultFetch.total && (
                <TablePaginationActions
                    count={resultFetch.total}
                    page={pageIndex}
                    rowsPerPage={rowsLength}
                    onChangePage={handleChangePageIndex}
                />
            )}
        </>
    );
};

export default UsersTable;
