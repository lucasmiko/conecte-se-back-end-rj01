export interface Place {
    id: string;
    name: string;
    site: string;
    address: string;
    image: string;
    ticket: string;
    description: string;
    status: string;
}

export enum PlaceStatus {
    ACTIVE = 'Funcionando',
    INACTIVE = 'Fechado',
    DISABLED = 'Fechado Permanentemente',
}