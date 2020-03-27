import React, {useRef, useContext} from 'react';
import {useGeolocation} from "react-use";
import ReactFlagsSelect from "../../../SelectCountriesFlags";
import {EmailInput, NumberInput, RadioInput, SelectInput, TelInput, TextInput, GeoCitiesInput} from "../../Inputs";
import StepNavigation from "../../StepNavigation";
import FieldWrapper from "../../FieldWrapper";
import Header from "../../../Header";



const Step = ({methods, formConfig, onSubmitStep, prevStep, nextStep, ...props}) => {
    const {watch, control, errors, getValues, register, formState, handleSubmit} = methods;

    const geolocation = useGeolocation({
        enableHighAccuracy : true,
        timeout : 10000
    });

    console.log(geolocation);

    return (
        <form className="form_wizard" onSubmit={handleSubmit(onSubmitStep)}>

            <button type="button" onClick={()=> {
                console.log(getValues());
                console.log(errors);
            }}>CLICK</button>

            <Header text="Informations sur le vendeur" />

            <FieldWrapper label="Prénom" required>
                <TextInput
                    name="firstname"
                    errors={errors}
                    control={control}
                    rules={{
                        required : 'Field required',
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Nom" required>
                <TextInput
                    name="lastname"
                    errors={errors}
                    control={control}
                    rules={{
                        required : 'Field required',
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Email" required>
                <EmailInput
                    name="email"
                    errors={errors}
                    control={control}
                    rules={{
                        required : "Field required"
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="test Number">
                <NumberInput
                    name="test"
                    errors={errors}
                    control={control}
                    rules={{
                        required: "Field required",
                        validate : {
                            positive: value => parseInt(value, 10) > 0 || 'should be greater than 0',
                            lessThanTen: value => parseInt(value, 10) < 10 || 'should be lower than 10'
                        }
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Numéro de téléphone">
                <TelInput
                    name="seller.phone"
                    errors={errors}
                    control={control}
                    rules={{
                        required : 'Field required',
                    }}
                />
            </FieldWrapper>

            <FieldWrapper label="Adresse complete">
                <GeoCitiesInput
                    enableGeoloc
                    lat={geolocation.latitude}
                    long={geolocation.longitude}
                    typeAPI="geo" //vicopo
                    name="seller.address"
                    control={control}
                    errors={errors}
                />
            </FieldWrapper>

            {/*<FieldWrapper label="CP/Ville">*/}
            {/*    <GeoCitiesInput*/}
            {/*        // typeAPI="geo" // vicopo*/}
            {/*        typeAPI="vicopo"*/}
            {/*        name="seller.address"*/}
            {/*        control={control}*/}
            {/*        errors={errors}*/}
            {/*    />*/}
            {/*</FieldWrapper>*/}

            {/*<Geolocalisation/>*/}

            {/*<LocationSearchInput/>*/}

            {/*<FieldWrapper label="Ville ou code postal">*/}
            {/*    <NumberInput*/}
            {/*        name="seller.postalcode"*/}
            {/*        errors={errors}*/}
            {/*        register={register({ required: 'Title is required' })}*/}
            {/*    />*/}
            {/*</FieldWrapper>*/}

            <FieldWrapper label="Nationalité">
                <ReactFlagsSelect
                    name="seller.nationality"
                    errors={errors}
                    control={control}
                    rules={{
                        required : "Field required"
                    }}
                />
            </FieldWrapper>

            <StepNavigation prev={prevStep} submitLabel="Créer mon annonce" submit />
        </form>
    );
};

export default Step;
