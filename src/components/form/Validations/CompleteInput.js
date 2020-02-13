import ValidationRules from "./ValidationRules";

export const buildInput = (input) => {
    if(!input.name) return null;
    input.nicename = input.nicename || input.name.toUpperCase();
    if(!input.validators) input.validators = [];
    if(input.required === true || input.required === "required"){
        input.validators.push(
            {
                isValidFun: ValidationRules.checkIsFilled,
                alert: `${input.nicename} is empty`
            }
        );
    }

    switch (input.type) {
        case 'email':
            input.validators.push(
                {
                    isValidFun: ValidationRules.checkIsEmail,
                    alert: `${input.nicename} is not valid`
                }
            );
            input.validators.push(
                {
                    isValidFun: ValidationRules.checkIsFilled,
                    alert: `${input.nicename} is empty`
                }
            );
            break;
        case 'password':
            input.validators.push(
                {
                    isValidFun: ValidationRules.checkIsFilled,
                    alert: `${input.nicename} is empty`
                }
            );
            // input.validators.push({
            //     isValidFun: ValidationRules.checkIsValidPassword,
            //     alert: "Password not valid : <br/> At least 8 char with at least 1 number"
            // });
            break;
    }
    return input;
};

export default (input) => buildInput(input);
