const fields = [
    {
        componentType : 'input',
        type: 'text',
        name: 'firstname',
        label: 'Firstname',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type: 'text',
        name: 'lastname',
        label: 'Lastname',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type: 'email',
        name: 'email',
        label: 'Email',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'Mot de passe',
        required : true,
        display : 'inline',
    },
    {
        componentType : 'input',
        type: 'password',
        name: 'confirm_pwd',
        id: 'confirm_pwd',
        label: 'Confirm password',
        required : true,
        display : 'inline',
        match: {
            id : 'password',
            alert: 'Password not egals'
        },
    },
    {
        componentType : 'input',
        type: 'checkbox',
        name: 'confirm',
        label: 'J’ai lu et j’accepte les conditions générales d’utilisation',
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
