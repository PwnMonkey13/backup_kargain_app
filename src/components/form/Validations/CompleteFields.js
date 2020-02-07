import ValidationRules from "./ValidationRules";

export const buildField = (field) => {
    if(!field.validators) field.validators = [];
    if(field.required === true || field.required === "required"){
        field.validators.push(
            {
                isValidFun: ValidationRules.checkIsFilled,
                alert: `${field.nicename || field.name} is empty`
            }
        );
    }

    switch (field.type) {
        case 'email':
            field.validators.push(
                {
                    isValidFun: ValidationRules.checkIsEmail,
                    alert: `${field.nicename || field.name.toUpperCase()} is not valid`
                }
            );
            field.validators.push(
                {
                    isValidFun: ValidationRules.checkIsFilled,
                    alert: `${field.nicename || field.name.toUpperCase()} is empty`
                }
            );
            break;
        case 'password':
            // field.validators.push({
            //     isValidFun: ValidationRules.checkIsValidPassword,
            //     alert: "Password not valid : <br/> At least 8 char with at least 1 number"
            // });
            break;
    }
    return field;
};

export default (model) => {
    return model.map(field => buildField(field));
}
