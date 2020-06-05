import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import FormWizard from '../../components/Form/FormWizard'
import AnnounceService from '../../services/AnnounceService'
import { ModalDialogContext } from '../../context/ModalDialogContext'
import Step0_CamperManufacturer from '../../components/Vehicles/camper/Step0_CamperManufacturer'
import Step1CamperDetails from '../../components/Vehicles/camper/Step1_CamperDetails'
import Step2CamperStatus from '../../components/Vehicles/camper/Step2_CamperStatus'
import Step3CarOwner from '../../components/Vehicles/car/Step3_CarOwner'

const CarForm = (props) => {
    const { dispatchModal } = useContext(ModalDialogContext)
    const router = useRouter()

    const onFinalSubmit = data => {
        AnnounceService.createAnnounce(data, props.token)
            .then(doc => {
                const link = `/announces/${doc.slug}`
                dispatchModal({ type: 'success', msg: 'Announce created successufully', link })
                router.push(link)
            }).catch(err => {
                dispatchModal({ type: 'error', err })
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
            onFinalSubmit={onFinalSubmit}>
            <Step0_CamperManufacturer title="Selection du véhicule"/>
            <Step1CamperDetails title="Description du véhicule"/>
            <Step2CamperStatus title="Etat du véhicule"/>
            <Step3CarOwner title="Votre annonce"/>
        </FormWizard>
    )
}

CarForm.getInitialProps = () => {
    return {
        formKey: 'camper',
        requiredAuth: true,
    }
}

export default CarForm
