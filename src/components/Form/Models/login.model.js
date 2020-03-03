const fields = [
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

const model = {
    config : {
        autoFill : false,
    },
    fields : fields
};

export default model;
