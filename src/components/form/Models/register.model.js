import completeFields from "../Validations/completeFields";

const model = [
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

export default completeFields(model);
