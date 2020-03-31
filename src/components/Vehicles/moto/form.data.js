import {SelectOptionsUtils} from "../../../libs/formFieldsUtils";
import FieldsTranslalted from "../../../../public/locales/fr/fields";

export const RadioTypeChoices = [
    {
        'label': 'Chopper',
        'value': 'chopper',
    },
    {
        'label': 'Cruiser',
        'value': 'cruiser',
    },
    {
        'label': 'Touring',
        'value': 'touring'
    },
    {
        'label': 'Quad',
        'value': 'quad'
    },
    {
        'label': 'Motoneige',
        'value': 'snowmobile'
    },
    {
        'label': 'Sportbike',
        'value': 'sportbike'
    },
    {
        'label': 'Moto legere',
        'value': 'light-motorcycle'
    },
    {
        'label': 'Mini bike',
        'value': 'mini-bike'
    },
    {
        'label': 'Scooter',
        'value': 'scooter'
    },
    {
        'label': 'Sportive',
        'value': 'Sportive'
    },
    {
        'label': 'Autre',
        'value': 'other'
    },
];

export const CheckboxOptionsEquipments = SelectOptionsUtils([
    "ABS",
    "ESP",
    "Pare-brise",
    "Pot catalytique",
    "Bluetooth",
    "Soundsystem",
    "CD",
    "MP3",
    "Régulateur de vitesse adaptatif",
    "USB",
    "Sacs de voyage",
    "Kickstarter",
    "Topcase",
    "Siege chauffant",
    "Equipement handicapé",
    "Dossier passager",
    "Poignées chauffantes",
    "Support de sécurité",
    "Attache remorque",
    "Alarme",
    "Kit gros pneu",
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

export const RadioChoicesMaterials = [
    {
        "value": "Alcantre",
        "label": "alcantre"
    },
    {
        "value": "Cuir",
        "label": "cuir"
    },
    {
        "value": "Cuir partiel",
        "label": "Cuir-partiel"
    },
    {
        "value": "Tissu",
        "label": "tissu"
    },
    {
        "value": "Velours",
        "label": "velours"
    },
    {
        "value": "Autre",
        "label": "autre"
    }
];

export const RadioGeneralStateVehicle = FieldsTranslalted.GeneralStateVehicle;
export const RadioFunctionVehicle = FieldsTranslalted.VehicleFunction;
