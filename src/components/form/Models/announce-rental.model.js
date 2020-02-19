import {SelectOptionsUtils} from "../../../libs/formFieldsUtils";
import FieldsTranslalted from "../../../../public/locales/fr/fields";

const RadioCategoryChoices = [
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
const RadioTypeChoices = [
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
const RadioChoicesGas = [
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
const RadioChoicesEngine = [
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
const RadioChoicesEmission = SelectOptionsUtils(['EURO1', 'EURO2', 'EURO3', 'EURO4', 'EURO5', 'EURO6']);
const SelectChoicesBrandsAPI = SelectOptionsUtils(['Audi', 'BMW', 'Mercedes', 'Peugeot', 'Renault', 'Fiat']);
const CheckboxOptionsEquipments = SelectOptionsUtils([
    "ABS","ESP","Régulateur de vitesse adaptatif","Soundsystem","Bluetooth","Hayon arrière électrique","CD","MP3","Start/Stop automatique","USB","Anti-patinage","Porte-bagages","Verrouillage centralisé sans clé","Rétroviseurs latéraux électriques","Airbags latéraux","Ordinateur de bord","Sieges ventilés","Direction assistée","Détecteur de pluie","Phares de jour","Vitres électriques","Anti-démarrage","Affichage tête haute","Jantes alliages","Toit ouvrant","Climatisation automatique","Phares au xénon","Volant en cuir","Kit mains libres","Régulateur de vitesses","Climatisation","Tappe de ski","Sièges massants","Volant multifonctions","Système de navigation","Sieges chauffants","Equipement handicapé","Sièges à réglage lombaire","Toit panoramique","Camera d’aide au stationnement","Radar de stationnement arrière","Pare-brise chauffant","Radar de stationnement avant","Suspension pneumatique","Airbag conducteur","Attache remorque","Phares directionnels","Airbag passager","Accoudoir","Chauffage auxiliaire","Pétales de changement de vitesse","Volant chauffant","4x4","Feux antibrouillard","Radio","Détecteur de lumière","LED phare de jour","Phares au LED","Porte coulissante","Écran tactile","Alarme","Le système d’appel d’urgence"
]);
const RadioChoicesExternalColor = [
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
const RadioChoicesPaints = [
    {
        "value": "metalique",
        "label": "Métalique"
    },
    {
        "value": "autre",
        "label": "Autre"
    }
];
const SelectChoicesDoors = SelectOptionsUtils([ 2, 3, 4, 5]);
const RadioChoicesVehicle = FieldsTranslalted.vehicleState;

const fields = [
    {
        componentType: 'title',
        as : 'h3',
        text : 'Données du véhicule',
        className : 'big-mt'
    },
    {
        componentType: 'input',
        type : 'text',
        label : 'Titre',
        name : 'title',
        display : "inline",
        fullWidth : true,
        required : true
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'category',
        label: 'Catégorie',
        required : true,
        choices: RadioCategoryChoices
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'type',
        label: 'Type',
        required : true,
        choices: RadioTypeChoices
    },
    {
        componentType : 'group',
        fields : [
            {
                componentType : 'input',
                type : 'select',
                name : 'manufacturer[make]',
                label : 'Marque',
                options : SelectChoicesBrandsAPI
            },
            {
                componentType : 'input',
                type : 'select',
                name : 'manufacturer[model]',
                label : 'Modèle',
                options : SelectChoicesBrandsAPI
            },
            {
                componentType : 'input',
                type : 'select',
                name : 'manufacturer[version]',
                label : 'Version',
                options : SelectChoicesBrandsAPI
            },
            {
                componentType : 'input',
                type: 'YearSelect',
                name: 'manufacturer[year]',
                label : 'Année',
                pattern : 'Y M',
            },
        ]
    },

    {
        componentType : 'group',
        label: 'Prix',
        fields : [
            {
                componentType : 'input',
                type: 'number',
                name: 'price[activePerHour]',
                label: 'Prix par jour',
                placeholder: "TTC",
                // required : true,
            },
            {
                componentType : 'input',
                type: 'number',
                name: 'price[pph]',
                label: 'Prix par heure',
                placeholder: "TTC",
                // required : true,
            },
            {
                componentType : 'input',
                type: 'checkbox',
                name: 'price[tva]',
                label: 'TVA déductible',
                // required : true,
            }
        ],
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'gas',
        label: 'Carburant',
        choices: RadioChoicesGas
        // required : true,
    },
    {
        componentType : 'input',
        type: 'number',
        name: 'mileage',
        label: 'Kilométrage',
        // required : true,
    },
    {
        componentType : 'group',
        label : 'Puissance',
        fields : [
            {
                componentType : 'input',
                type: 'number',
                name: 'power[kw]',
                label: 'Puissance kW',
                // required : true,
            },
            {
                componentType : 'input',
                type: 'number',
                name: 'power[ch]',
                label: 'Puissance CH',
                // required : true,
            }
        ]
    },
    {
        componentType : 'input',
        type: 'number',
        name: 'cylinder',
        label: 'Cylindrée',
        // required : true,
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'engine',
        label: 'Boite de vitesse',
        // required : true,
        choices: RadioChoicesEngine
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'emission',
        label: "Classe d\'émission",
        choices: RadioChoicesEmission
    },
    {
        componentType : 'group',
        label : 'Consommation',
        fields : [
            {
                componentType : 'input',
                type: 'number',
                name: 'consumption[mixt]',
                label: 'Mixte',
                // required : true,
            },
            {
                componentType : 'input',
                type: 'number',
                name: 'consumption[city]',
                label: 'Ville',
                // required : true,
            },
            {
                componentType : 'input',
                type: 'number',
                name: 'consumption[road]',
                label: 'Route',
                // required : true,
            },
            {
                componentType : 'input',
                type: 'number',
                name: 'consumption[gkm]',
                label: 'CO2',
                // required : true,
            },
        ]
    },
    {
        componentType : 'input',
        type: 'checkbox-multiple',
        name: 'equipments',
        label: "Equipements",
        options: CheckboxOptionsEquipments,
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'externalColor',
        label: "Couleur extérieure",
        // required : true,
        choices: RadioChoicesExternalColor
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'paint',
        label: "Peinture",
        // required : true,
        choices: RadioChoicesPaints
    },
    {
        componentType : 'input',
        type: 'select',
        name: 'doors',
        label: "Nombre de portes",
        // required : true,
        options: SelectChoicesDoors
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'internalColor',
        label: "Couleur intérieure",
        // required : true,
        choices: RadioChoicesExternalColor
    },
    // {
    //     componentType : 'input',
    //     type: 'checkbox-multiple',
    //     name: 'materials',
    //     label: "Matériaux",
    //     // required : true,
    //     options: RadioChoicesPaints
    // },
    {
        componentType : 'input',
        type: 'select',
        name: 'seats',
        linked : 'seats',
        label: "Nombre de places",
        required : true,
        options: SelectOptionsUtils([2, 3, 4, 5])
    },
    {
        componentType: 'title',
        as : 'h3',
        text : 'Etats du véhicule',
        className : 'big-mt'
    },
    {
        componentType : 'input',
        type: 'text',
        name: 'vin',
        label : 'VIN',
    },
    {
        componentType : 'input',
        type: 'radio',
        name: 'vehicleState',
        label: 'Etat général',
        required : true,
        choices: RadioChoicesVehicle
    },
    {
        componentType : 'input',
        type: 'select',
        name: 'owners',
        label: 'Nombre de propriétaires',
        options: SelectOptionsUtils([2, 3, 4, 5])
    },
    {
        componentType : 'input',
        type: 'select',
        name: 'damages',
        label: 'Véhicule accidenté',
        options: SelectOptionsUtils([2, 3, 4, 5])
    },
    {
        componentType : 'input',
        type: 'select',
        name: 'defective',
        label: 'Véhicule deffectueux',
        options: SelectOptionsUtils([2, 3, 4, 5])
    },
    {
        componentType: 'title',
        as : 'h3',
        text : 'Description',
        className : 'big-mt'
    },
    {
        componentType : 'input',
        type: 'textarea',
        name: 'description',
        placeholder : FieldsTranslalted.textarea,
    },
    // {
    //     componentType : 'input',
    //     name : 'tags',
    //     type: 'tags',
    // },
    {
        componentType: 'title',
        as : 'h3',
        text : 'Photos',
        className : 'big-mt'
    },
    // {
    //     componentType : 'input',
    //     type: 'FileUpload',
    //     name : "cartegrise"
    // },
    {
        componentType: 'title',
        as : 'h3',
        text : 'Fiches techniques',
        className : 'big-mt'
    },
    // {
    //     componentType : 'input',
    //     type : 'technicalPaperTabs',
    //     active : 0,
    // },
    {
        componentType: 'title',
        as : 'h3',
        text : 'Données du vendeur',
        className : 'big-mt'
    },
    {
        componentType : 'group',
        label : '',
        fields: [
            {
                componentType : 'input',
                type : 'select',
                name : 'seller[country]',
                label : 'Pays',
                options : [
                ]
            },
            {
                componentType : 'input',
                type : 'text',
                name : 'seller[postalcode]',
                label : 'Ville ou code postal',
            },
            {
                componentType : 'input',
                type : 'tel',
                name : 'seller[phone]',
                label : 'Numéro de téléphone',
                nicename : 'Tel',
            },
        ]
    },
];

const model = {
    config : {
        autoFill : false,
    },
    fields : fields
};

export default model;
