import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TableMUI from '../TableMUI';
import AnnounceService from '../../../services/AnnounceService';
import { ModalDialogContext } from '../../../context/ModalDialogContext';
import TablePaginationActions from '../../TablePaginationActions';
import AnnounceModel from '../../../models/announce.model';
import { getTimeAgo } from '../../../libs/utils';
import StatusBullet from '../StatusBullet';
import VisibleBullet from '../VisibleBullet';
import ActivatedBullet from '../ActivatedBullet';

const AdsTable = () => {
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsLength, setRowsLength] = useState(60);
    const [resultFetch, setResultsFetch] = React.useState({
        rows: [],
        total: 0
    });

    const columns = useMemo(() => [
        {
            title: 'ID',
            render: rowData => rowData.tableData.id + 1
        },
        {
            title: 'Avatar',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => {
                return <img
                    alt=""
                    title={AnnounceModel.getAuthor.getFullName}
                    src={AnnounceModel.getAuthor.getAvatar}
                    style={{
                        width: 40,
                        borderRadius: '50%'
                    }}
                />;
            }
        },
        {
            title: 'Titre',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            width: 300,
            render: AnnounceModel => AnnounceModel.getTitle
        },
        {
            title: 'Activated',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => <ActivatedBullet
                slug={AnnounceModel.getSlug}
                activated={AnnounceModel.getIsActivated}
            />
        },
        {
            title: 'Visible',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => <VisibleBullet
                slug={AnnounceModel.getSlug}
                visible={AnnounceModel.getIsVisible}
            />
        },
        {
            title: 'Status',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => <StatusBullet
                slug={AnnounceModel.getSlug}
                status={AnnounceModel.getStatus}
            />
        },
        {
            title: 'Création',
            render: AnnounceModel => {
                const date = AnnounceModel.getRaw?.updatedAt;
                return getTimeAgo(date, 'fr');
            }
        },
        {
            title: 'Type d\'annonce',
            filtering: true,
            sorting: true,
            grouping: false,
            render: AnnounceModel => AnnounceModel.getVehicleAdType
        },
        {
            title: 'Type',
            grouping: true,
            searchable: true,
            sorting: true,
            render: AnnounceModel => AnnounceModel.getVehicleType
        },
        {
            title: 'Marque',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => AnnounceModel.getManufacturer.make
        },
        {
            title: 'Modele',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => AnnounceModel.getManufacturer.model
        },
        {
            title: 'Prix',
            type: 'currency',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            currencySetting: {
                locale: 'fr',
                currencyCode: 'eur'
            },
            render: AnnounceModel => AnnounceModel.getPrice
        },
        {
            title: 'Kilométrage',
            type: 'numeric',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => AnnounceModel.getMileage
        },
        {
            title: 'Ville',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => AnnounceModel.getAddressParts.city
        },
        {
            title: 'CP',
            numeric: true,
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: AnnounceModel => AnnounceModel.getAddressParts.postCode
        }
    ], []);

    const handleItemClick = (e, AnnounceModel) => {
        if (AnnounceModel) router.push(AnnounceModel.getAnnounceEditLink);
    };

    const handleChangePageIndex = (pageIndex) => {
        setPageIndex(pageIndex);
    };

    const fetchData = React.useCallback(() => {
        setLoading(true);
        AnnounceService.getAnnouncesAll({
            size: rowsLength,
            page: pageIndex
        })
            .then(data => {
                const { rows } = data;
                const rowsModel = rows.map(row => new AnnounceModel(row));
                setResultsFetch({
                    ...data,
                    rows: rowsModel
                });
                setLoading(false);
            })
            .catch(err => {
                dispatchModalError({ err });
            });
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
                        onClick: (event, rowData) => router.history.push('/admin/ads/new')
                    },
                    {
                        icon: EditIcon,
                        tooltip: 'Modifier',
                        onClick: (e, AnnounceModel) => handleItemClick(e, AnnounceModel)
                    }
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
}
;

export default AdsTable;
