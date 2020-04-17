function CheckboxesUtils (data, alreadyChecked = []) {
    return data.map(item => {
        if (typeof item === 'object') {
            const { name } = item
            const checked = alreadyChecked.includes(name)
            return { checked, ...item }
        } else {
            const name = item.split(' ').join('-').toLowerCase()
            const checked = alreadyChecked.includes(item)
            return {
                checked,
                name,
                label: item
            }
        }
    })
}

function SelectOptionsUtils (data) {
    return data.map(item => {
        if (typeof item === 'object') return { ...item }
        else {
            return {
                value: typeof item === 'string' ? item.split(' ').join('-').toLowerCase() : Number(item),
                label: item
            }
        }
    })
}

export { CheckboxesUtils, SelectOptionsUtils }
