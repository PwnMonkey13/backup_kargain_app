import {SelectOptionsUtils} from "./formFieldsUtils";
import FieldsTranslalted from "../../public/locales/fr/fields";

export const RadioCategoryChoices = [
    {
        'label': 'Voiture',
        'value': 'car',
    },
    {
        'label': 'Moto',
        'value': 'bike',
    },
    {
        'label': 'Camping',
        'value': 'campingcar',
    },
    {
        'label': 'Utilitaire',
        'value': 'commercial vehicule',
    },
];
export const RadioTypeChoices = [
    {
        'label': 'Citadine',
        'value': 'citadine',
    },
    {
        'label': 'Cabriolet',
        'value': 'convertible',
    },
    {
        'label': 'Coupé',
        'value': 'cupcar'
    },
    {
        'label': 'SUV/4x4',
        'value': 'suv'
    },
    {
        'label': 'Berline',
        'value': 'sedan'
    },
    {
        'label': 'Break',
        'value': 'break'
    },
    {
        'label': 'Monospace',
        'value': 'minivan'
    },
    {
        'label': 'Autre',
        'value': 'other'
    }
];
export const RadioChoicesGas = [
    {
        'label': 'Diesel',
        'value': 'diesel',
    },
    {
        'label': 'Essence',
        'value': 'gas'
    },
    {
        'label': 'Éthanol',
        'value': 'ethanol'
    },
    {
        'label': 'Electrique',
        'value': 'eletric'
    },
    {
        'label': 'Hybride diesel',
        'value': 'hybride-gas'
    },
    {
        'label': 'Hydrogène',
        'value': 'hydrogen'
    },
    {
        'label': 'Monospace',
        'value': 'minivan'
    },
    {
        'label': 'Gaz compressé (GPL)',
        'value': 'gpl'
    }
];
export const RadioChoicesEngine = [
    {
        'label': 'Automatique',
        'value': 'automatic',
    },
    {
        'label': 'Manuelle',
        'value': 'manual'
    },
    {
        'label': 'Semi-automatique',
        'value': 'semi-auto'
    },
];
export const RadioChoicesEmission = SelectOptionsUtils(['EURO1', 'EURO2', 'EURO3', 'EURO4', 'EURO5', 'EURO6']);
export const SelectChoicesBrandsAPI = SelectOptionsUtils(['Audi', 'BMW', 'Mercedes', 'Peugeot', 'Renault', 'Fiat']);
export const CheckboxOptionsEquipments = SelectOptionsUtils([
    "ABS", "ESP", "Régulateur de vitesse adaptatif", "Soundsystem", "Bluetooth", "Hayon arrière électrique", "CD", "MP3", "Start/Stop automatique", "USB", "Anti-patinage", "Porte-bagages", "Verrouillage centralisé sans clé", "Rétroviseurs latéraux électriques", "Airbags latéraux", "Ordinateur de bord", "Sieges ventilés", "Direction assistée", "Détecteur de pluie", "Phares de jour", "Vitres électriques", "Anti-démarrage", "Affichage tête haute", "Jantes alliages", "Toit ouvrant", "Climatisation automatique", "Phares au xénon", "Volant en cuir", "Kit mains libres", "Régulateur de vitesses", "Climatisation", "Tappe de ski", "Sièges massants", "Volant multifonctions", "Système de navigation", "Sieges chauffants", "Equipement handicapé", "Sièges à réglage lombaire", "Toit panoramique", "Camera d’aide au stationnement", "Radar de stationnement arrière", "Pare-brise chauffant", "Radar de stationnement avant", "Suspension pneumatique", "Airbag conducteur", "Attache remorque", "Phares directionnels", "Airbag passager", "Accoudoir", "Chauffage auxiliaire", "Pétales de changement de vitesse", "Volant chauffant", "4x4", "Feux antibrouillard", "Radio", "Détecteur de lumière", "LED phare de jour", "Phares au LED", "Porte coulissante", "Écran tactile", "Alarme", "Le système d’appel d’urgence"
]);
export const RadioChoicesExternalColor = [
    {
        "value": "noir",
        "label": "Noir"
    },
    {
        "value": "blanc",
        "label": "Blanc"
    },
    {
        "value": "vert",
        "label": "Vert"
    },
    {
        "value": "belge",
        "label": "Belge"
    },
    {
        "value": "doré",
        "label": "Doré"
    },
    {
        "value": "marron",
        "label": "Marron"
    },
    {
        "value": "orange",
        "label": "Orange"
    },
    {
        "value": "bronze",
        "label": "Bronze"
    },
    {
        "value": "violet",
        "label": "Violet"
    },
    {
        "value": "bleu",
        "label": "Bleu"
    },
    {
        "value": "rouge",
        "label": "Rouge"
    },
    {
        "value": "argent",
        "label": "Argent"
    },
    {
        "value": "gris",
        "label": "Gris"
    },
    {
        "value": "jaune",
        "label": "Jaune"
    },
    {
        "value": "autre",
        "label": "Autre"
    }
];
export const RadioChoicesPaints = [
    {
        "value": "metalique",
        "label": "Métalique"
    },
    {
        "value": "autre",
        "label": "Autre"
    }
];
export const SelectChoicesDoors = SelectOptionsUtils([2, 3, 4, 5]);
export const RadioGeneralStateVehicle = FieldsTranslalted.GeneralStateVehicle;
export const RadioFunctionVehicle = FieldsTranslalted.VehicleFunction;
