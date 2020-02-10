import CompleteFields from "../Validations/CompleteFields";

const model = [
    {
        componentType: 'group',
        fields: [
            {
                componentType: 'input',
                type: 'text',
                name: 'firstname',
                label: 'Prénom',
                field: 'name.firstname',
                required: true,
            },
            {
                componentType : 'input',
                type: 'text',
                name: 'lastname',
                field : 'name.lastname',
                label: 'Nom',
                required : true,
            },
        ]
    },
    {
        componentType : 'input',
        type: 'email',
        name: 'email',
        label: 'Email',
        field: 'email',
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
        name: 'street',
        field : 'address.street',
        label: 'Adresse',
        type: 'text',
    },
    {
        componentType : 'input',
        name: 'postalCode',
        label: 'Code postal',
        field : 'address.postalcode',
        type: 'text',
    },
    {
        componentType : 'input',
        name: 'city',
        label: 'Ville',
        field : 'address.city',
        type: 'text',
    },
];

export default CompleteFields(model);
