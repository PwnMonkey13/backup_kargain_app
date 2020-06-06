import React, { useState } from 'react';
import NiceSelect from 'react-select';
import useTranslation from 'next-translate/useTranslation';

const Sorters = ({ updateSorter }) => {
    const { t } = useTranslation();
    const options = [
        {
            label: t('sorters:most-recent'),
            value: {
                key: 'DATE',
                asc: false,
            },
        },
        {
            label: t('sorters:less-recent'),
            value: {
                key: 'DATE',
                asc: true,
            },
        },
        {
            label: t('sorters:most-recent'),
            value: {
                key: 'PRICE',
                asc: false,
            },
        },
        {
            label: t('sorters:less-recent'),
            value: {
                key: 'PRICE',
                asc: true,
            },
        },
        {
            label: 'Les plus kilométrées',
            value: {
                key: 'MILEAGE',
                asc: false,
            },
        },
        {
            label: 'Les moins kilométrées',
            value: {
                key: 'MILEAGE',
                asc: true,
            },
        },
        {
            label: 'Les plus proches',
            value: {
                key: 'MILEAGE',
                asc: true,
            },
        },
        {
            label: 'Les moins proches',
            value: {
                key: 'MILEAGE',
                asc: false,
            },
        },
    ];
    const [sorter, setSorter] = useState(options[0]);

    const onHandleChange = (sort) => {
        setSorter(sort);
        updateSorter(sort.value);
    };

    return (
        <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }}>
            <span>{t('sorters:sort-by')}:</span>
            <div style={{
                margin: '1rem',
                width: '15rem',
            }}>
                <NiceSelect
                    name="sort"
                    value={sorter}
                    autosize={true}
                    onChange={onHandleChange}
                    classNames='w-100'
                    options={options}
                />
            </div>
        </section>
    );
};

export default Sorters;
