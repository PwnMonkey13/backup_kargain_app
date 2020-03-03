const fields = [
    {
        componentType: 'group',
        fields: [
            {
                componentType: 'input',
                type: 'text',
                name: 'firstname',
                label: 'Prénom',
                required: true,
            },
            {
                componentType : 'input',
                type: 'text',
                name: 'lastname',
                label: 'Nom',
                required : true,
            },
        ]
    },
    {
        componentType: 'title',
        as : 'h3',
        text : 'Données du véhicule',
        className : 'big-mt'
    },
    {
        componentType : 'input',
        type: 'email',
        name: 'email',
        label: 'Email',
        required : true,
    },
    {
        componentType : 'input',
        type: 'text',
        name: 'birthdate',
        label: 'Date de naissance',
    },
    {
        componentType : 'input',
        remove: true,
        type: 'tel',
        name: 'tel',
        label: 'Téléphone',
    },
    {
        componentType : 'title',
        as : 'h3',
        text : 'Adresse',
        className : 'heading'
    },
    {
        componentType : 'input',
        name: 'address[street]',
        label: 'Adresse',
        type: 'text',
    },
    {
        componentType : 'input',
        name: 'address[postalcode]',
        label: 'Code postal',
        type: 'text',
    },
    {
        componentType : 'input',
        name: 'address[city]',
        label: 'Ville',
        type: 'text',
    },
];

const model = {
    config : {
        autoFill : true,
    },
    fields : fields
};

export default model;
