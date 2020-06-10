import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TableMUI from '../TableMUI';
import BulletPoint from '../../BulletPoint';
import AnnounceService from '../../../services/AnnounceService';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import TablePaginationActions from '../../TablePaginationActions';
import UserModel from '../../../models/user.model';
import Announce from '../../../models/announce.model';
import useTranslation from 'next-translate/useTranslation';
import { getTimeAgo } from '../../../libs/utils';

const StatusBullet = (status) => {
    console.log(status);
    switch (status) {
    case 'rejected' :
        return <BulletPoint tooltipHelper="Rejected" color="red"/>;
    case 'deleted' :
        return <BulletPoint tooltipHelper="Deleted" color="black"/>;
    case 'archived' :
        return <BulletPoint tooltipHelper="Archived" color="orange"/>;
    case 'active' :
        return <BulletPoint tooltipHelper="Active" color="blue"/>;
    case 'paid':
        return <BulletPoint tooltipHelper="Payé" color="green"/>;
    }
};

const AdsTable = () => {
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsLength, setRowsLength] = useState(60);
    const [resultFetch, setResultsFetch] = React.useState({
        rows: [],
        total: 0,
    });

    const columns = useMemo(() => [
        {
            title: 'ID',
            render: rowData => rowData.tableData.id + 1,
        },
        {
            title : "Date",
            render : row => {
                const ad = new Announce(row)
                const date = ad.getRaw?.updatedAt;
                return getTimeAgo(date, 'fr');
            }
        },
        {
            title: 'Status',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => StatusBullet(row.status),
        },
        {
            title: 'Avatar',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: rowData => {
                const user = new UserModel(rowData?.user)
                return <img
                    alt=""
                    src={user.getAvatar}
                    style={{
                        width: 40,
                        borderRadius: '50%',
                    }}
                />;
            },
        },
        {
            title: 'Type d\'annonce',
            filtering: true,
            sorting: true,
            grouping: false,
            render: row => row.adType?.label,
        },
        {
            title: 'Type',
            grouping: true,
            searchable: true,
            sorting: true,
            render: row => row.vehicleType?.label,
        },
        {
            title: 'Auteur',
            filtering: false,
            grouping: false,
            sorting: true,
            render: rowData => {
                const user = new UserModel(rowData?.user)
                return user.getFullName
            }
        },
        {
            title: 'Titre',
            field: 'title',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
        },
        {
            title: 'Marque',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => row.manufacturer?.make?.label,
        },
        {
            title: 'Modele',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => row.manufacturer?.model?.label,
        },
        {
            title: 'Prix',
            field: 'price',
            type: 'currency',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            currencySetting: {
                locale: 'fr',
                currencyCode: 'eur',
            },
        },
        {
            title: 'Kilométrage',
            field: 'mileage',
            type: 'numeric',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
        },
        {
            title: "Ville",
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => {
                const ad = new Announce(row)
                return ad.getAddressParts.city
            }
        },
        {
            title: "CP",
            numeric : true,
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => {
                const ad = new Announce(row)
                return ad.getAddressParts.postCode
            }
        },
    ], []);

    const handleItemClick = (e, ad) => {
        if (ad) router.push(`/announces/${ad.slug}`);
    };

    const handleChangePageIndex = (pageIndex) => {
        setPageIndex(pageIndex);
    };

    const fetchData = React.useCallback(() => {
        setLoading(true);

        AnnounceService.getAnnouncesAll({
            size: rowsLength,
            page: pageIndex,
        })
            .then(data => {
                setResultsFetch(data);
                setLoading(false);
            }).catch(err => {
                dispatchModalError({ err });
            },
        );
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageIndex]);

    return (
        <>
            <TableMUI
                loading={loading}
                data={resultFetch.rows}
                columns={columns}
                title="Annonces Kargain"
                actions={[
                    {
                        icon: AddIcon,
                        tooltip: 'Ajouter une annonce',
                        isFreeAction: true,
                        onClick: (event, rowData) => router.history.push('/admin/ads/new'),
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Modifier',
                        onClick: (e, data) => handleItemClick(e, data),
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

export default AdsTable;
