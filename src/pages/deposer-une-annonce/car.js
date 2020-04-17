import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import FormWizard from '../../components/Form/FormWizard'
import AnnounceService from '../../services/AnnounceService'
import { ModalDialogContext } from '../../components/Context/ModalDialogContext'
import Step0CarManufacturer from '../../components/Vehicles/car/Step0_CarManufacturer'
import Step1CarDetails from '../../components/Vehicles/car/Step1_CarDetails'
import Step2CarStatus from '../../components/Vehicles/car/Step2_CarStatus'
import Step3CarOwner from '../../components/Vehicles/car/Step3_CarOwner'

const CarForm = (props) => {
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext)
    const router = useRouter()

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc.slug}`
                dispatchModal({ type: 'success', msg: 'Announce created successufully', link })
                router.push(link)
            }).catch(err => {
                dispatchModalError({ err })
            }
            )
    }

    const resumeModel = [
        {
            vehicleType: 'Type de véhicule'
        },
        {
            vin: 'Immat. VIN',
            'manufacturer.make': 'Marque',
            'manufacturer.model': 'Modele',
            'manufacturer.generation': 'Version',
            'manufacturer.year': 'Année'
        }
    ]

    return (
        <FormWizard
            formKey={props.formKey}
            prevRoute="/deposer-une-annonce"
            resumeModel={resumeModel}
            // enableResume={true}
            onFinalSubmit={onFinalSubmit}>
            <Step0CarManufacturer title="Sélection du véhicule"/>
            <Step1CarDetails title="Description du véhicule"/>
            <Step2CarStatus title="Etat du véhicule"/>
            <Step3CarOwner title="Votre annonce"/>
        </FormWizard>
    )
}

CarForm.getInitialProps = () => {
    return {
        formKey: 'car'
    }
}

export default CarForm
