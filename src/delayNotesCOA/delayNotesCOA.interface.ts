export interface CreateDelayNoteCOA {
    cycleTimeCOAId: string;
    route: string;
    activity: string;
    type: Type
    notes: string;
}

export interface EditDelayNoteCOA {
    cycleTimeCOAId?: string;
    route?: string;
    activity?: string;
    type?: Type;
    notes?: string;
}

export enum Type {
    Internal = 'Internal',
    External = 'External',
}