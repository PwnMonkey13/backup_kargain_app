const fields = [
    {
        componentType : 'input',
        name: 'company_name',
        label: 'Nom de société',
        type: 'text',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'company_ID',
        label: 'ID société',
        type: 'text',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type : 'file',
        name : 'kbis',
        label : 'Numéro KBIS',
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'company_owner',
        label: 'Gérant de la société',
        type: 'text',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type : 'select',
        name : 'address[country]',
        label : 'Pays',
        display : 'inline',
        options : [
            { value: 'france', label: 'France' },
            { value: 'spain', label: 'Espagne' },
            { value: 'italie', label: 'Italie' }
        ]
    },
    {
        componentType : 'input',
        type : 'text',
        name : 'address[postalcode]',
        label : 'Ville ou code postal',
        display : 'inline',
    },
    {
        componentType : 'input',
        type : 'text',
        name : 'address[address]',
        label : 'Adresse',
        display : 'inline',
    },
    {
        componentType : 'input',
        type : 'tel',
        name : 'seller[phone]',
        label : 'Numéro de téléphone',
        nicename : 'Tel',
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'firstname',
        label: 'Firstname',
        type: 'text',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'lastname',
        label: 'Lastname',
        type: 'text',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'email',
        label: 'Email',
        type: 'email',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type : 'text',
        name : 'nicename',
        label : 'Nom d\'utilisateur',
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'password',
        id: 'password',
        label: 'Mot de passe',
        type: 'password',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        name: 'confirm_pwd',
        id: 'confirm_pwd',
        label: 'Confirm password',
        type: 'password',
        required : true,
        display : 'inline',
        match: {
            id : 'password',
            alert: 'Password not egals'
        },
    },
    {
        componentType : 'input',
        name: 'confirm',
        label: 'J’ai lu et j’accepte les conditions générales d’utilisation',
        type: 'checkbox',
        required: true,
        display : 'inline',
    }
];

const model = {
    config : {
        autoFill : true,
    },
    fields : fields
};

export default model;
