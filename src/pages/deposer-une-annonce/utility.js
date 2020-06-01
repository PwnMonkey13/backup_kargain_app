import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import FormWizard from '../../components/Form/FormWizard'
import AnnounceService from '../../services/AnnounceService'
import { ModalDialogContext } from '../../context/ModalDialogContext'
import Step1CamperDetails from '../../components/Vehicles/utility/Step1_UtiilityDetails'

const UtilityForm = (props) => {
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
            onFinalSubmit={onFinalSubmit}
        >
            <Step1CamperDetails title="Description du véhicule"/>
        </FormWizard>
    )
}

UtilityForm.getInitialProps = () => {
    return {
        formKey: 'utility',
        requiredAuth: true,
    }
}

export default UtilityForm
