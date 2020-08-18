const getValues = (vehicleType) => {
    switch (vehicleType) {
    case 'car':
        return [
            'outside-view',
            'inside-view',
            'front-face'
            // 'rear-face',
            // 'left-side',
            // 'right-side',
            // 'mecanic'
        ]
    case 'moto' :
        return []
    }
}

const damagesFilters = (vehicleType = "car", tabs) => {
    const values = getValues(vehicleType);
    if(values && Array.isArray(tabs)) return tabs.filter(tab => values.includes(tab['key']));
    return [];
}

export default damagesFilters
