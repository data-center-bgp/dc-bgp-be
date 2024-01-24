export interface CreateAttendanceRecord {
    vesselId: string;
    crewId: string;
    crewPosition: string;
    photo: string;
    latitude: number;
    longitude: number;
    photoTimeTaken: Date;
    photoLatitude: number;
    photoLongitude: number;
}

export interface EditAttendanceRecord {
    vesselId: string;
    crewId?: string;
    crewPosition?: string;
    photo?: string;
    latitude?: number;
    longitude?: number;
    photoTimeTaken?: Date;
    photoLatitude?: number;
    photoLongitude?: number;
}