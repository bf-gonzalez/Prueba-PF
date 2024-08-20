
import { MembershipOption } from '@/interface';

export const membershipOptions: MembershipOption[] = [
    {
        name: 'Plan Estándar',
        price: 500,
        type:"monthly_member",
        description: '¡Ideal para poca lectura!',
        features: [
            { text: 'Todos los que desees leer', isAvailable: true },
            { text: 'Accede a informacion de eventos', isAvailable: true },
            { text: 'Ponle like a tus favoritos', isAvailable: true },
            { text: 'Participa a descuentos de entradas', isAvailable: false },
            { text: 'Acceso a contenido con antelacion', isAvailable: false },
            { text: 'Prioridad en eventos creados por la pagina', isAvailable: false },
        ],
    },
    {
        name: 'Plan Anual',
        price: 4800,
        type: "annual_member",
        description: '¡A disposición todo el año!',
        features: [
            { text: 'Todos los que desees leer', isAvailable: true },
            { text: 'Accede a informacion de eventos', isAvailable: true },
            { text: 'Ponle like a tus comics favoritos', isAvailable: true },
            { text: 'Participa a descuentos de entradas', isAvailable: true },
            { text: 'Acceso a contenido con antelacion', isAvailable: true },
            { text: 'Prioridad en eventos creados por la pagina', isAvailable: true },
        ],
    },
    {
        name: 'Plan Creador',
        price: 2000,
        type: "creator",
        description: '¡Demuestra que eres el mejor!',
        features: [
            { text: 'Poder crear tus propios comics', isAvailable: true },
            { text: 'Cobrar dependiendo tus seguidores', isAvailable: true },
            { text: 'Lee comentarios de tus fans', isAvailable: true },
            { text: 'Todos los que desees leer', isAvailable: false },
            { text: 'Acceso a la API', isAvailable: false },
            { text: 'Integración con CMS', isAvailable: false },
        ],
    }
];

