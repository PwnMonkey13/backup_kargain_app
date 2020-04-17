import React, { useState } from 'react'
import NiceSelect from 'react-select'

const Sorters = ({ updateSorter }) => {
    const options = [
        {
            label: 'Les plus récentes',
            value: { key: 'createdAt', desc: true }
        },
        {
            label: 'Les moins récentes',
            value: { key: 'createdAt', desc: false }
        },
        {
            label: 'Les plus chères',
            value: { key: 'price', desc: true }
        },
        {
            label: 'Les moins chères',
            value: { key: 'price', desc: false }
        },
        {
            label: 'Les plus kilométrées',
            value: { key: 'mileage', desc: false }
        },
        {
            label: 'Les moins kilométrées',
            value: { key: 'mileage', desc: true }
        }
    ]
    const [sorter, setSorter] = useState(options[0])
    const onHandleChange = (sort) => {
        setSorter(sort)
        updateSorter(sort)
    }

    return (
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span>Trier par :</span>
            <div style={{ margin: '1rem', width: '15rem' }}>
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
    )
}

export default Sorters
