import completeFields from "../Validations/completeFields";

const model = [
    {
        componentType : 'input',
        name: 'email',
        label: 'Email',
        type: 'email',
        display : 'inline',
        required : true,
    },
    {
        componentType : 'input',
        name: 'password',
        label: 'Mot de passe',
        type: 'password',
        display : 'inline',
        required : true,
    },
];

export default completeFields(model);
