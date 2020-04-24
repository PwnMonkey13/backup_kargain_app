import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button'
import TableMUI from '../TableMUI'
import BulletPoint from '../../BulletPoint'
import AnnounceService from '../../../services/AnnounceService'

const StatusBullet = (row) => {
    const status = row.status;
    switch (status) {
    case 'refused' :
        return <BulletPoint tooltipHelper="Refusé" color="black"/>;
    case 'pending' :
        return <BulletPoint tooltipHelper="En attente" color="orange"/>;
    case 'paid':
        return <BulletPoint tooltipHelper="Payé" color="green"/>;
    }
};

const AdsTable = () => {
    const router = useRouter();
    const [resultFetch, setResultsFetch] = React.useState({ rows : [] })
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(2)
    const [pageCount, setPageCount] = useState(0);

    const columns = React.useMemo(() => [
        {
            title: "Status de l'annonce",
            field: 'status',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => StatusBullet(row),
        },
        {
            title: 'Avatar',
            field: 'avatar',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: rowData =>{
                const { user } = rowData;
                if(user){
                    return <img src={user.avatar} style={{width: 40, borderRadius: '50%'}} alt=""/>
                } else return null
            }
        },
        {
            title: "Propriétaire",
            filtering: false,
            grouping: false,
            sorting: true,
            render: rowData => {
                const { user } = rowData;
                if(user) return user.fullname;
                else return null
            },
        },
        {
            title: "Type d'annonce",
            field: 'adType',
            filtering: true,
            grouping: true,
            searchable: true,
            sorting: true,
            lookup: { 'sale' : 'Vente' },
        },
        {
            title: 'Type de véhicule',
            field: 'vehicleType',
            // filtering: true,
            grouping: true,
            searchable: true,
            sorting: true
        },
        {
            title: "Titre de l'annonce",
            field: 'title',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true
        },
        {
            title: "Marque",
            field: 'manufacturer.make',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => {
                const val = row.manufacturer && row.manufacturer.make;
                if(val) return (typeof val === 'object' && val.value) ? val.value : val;
                else return null
            },
        },
        {
            title: "Modele",
            field: 'manufacturer.model',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true,
            render: row => {
                const val = row.manufacturer && row.manufacturer.model;
                if(val) return (typeof val === 'object' && val.value) ? val.value : val;
                else return null
            }
        },
        {
            title: "Prix de l'annonce",
            field: 'price',
            type: 'currency',
            currencySetting : '€',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true
        },
        {
            title: 'Kilométrage',
            field: 'mileage',
            type : 'numeric',
            filtering: false,
            grouping: false,
            searchable: true,
            sorting: true
        },
        // {
        //     title: "Ville",
        //     filtering: false,
        //     grouping: false,
        //     searchable: true,
        //     sorting: true,
        //     render: row => {
        //         const val = row.location && row.location.city;
        //         if(val) return (typeof val === 'object' && val.value) ? val.value : val;
        //         else return null
        //     }
        // },
        // {
        //     title: "CP",
        //     numeric : true,
        //     filtering: false,
        //     grouping: false,
        //     searchable: true,
        //     sorting: true,
        //     render: row => {
        //         const val = row.location && row.location.postalcode;
        //         if(val) return (typeof val === 'object' && val.value) ? val.value : val;
        //         else return null
        //     }
        // },
    ], [])

    const fetchData = React.useCallback(() => {
        setLoading(true)
        setPageSize(pageSize)
        setPageIndex(pageIndex);

        AnnounceService.getAnnounces()
            .then(data => {
                console.log(data)
                setResultsFetch(data)
                // setPageCount(data.pages)
                setLoading(false)
            }).catch(err => console.log(err))
    }, [])

    const handleItemClick = (e, user) => {
        if(user) router.push(`/admin/users/${user.username}`)
        else console.log("not found");
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <TableMUI
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
                    onClick: (e, data) => handleItemClick(e, data)
                }
            ]}
        />
    )
}

export default AdsTable
