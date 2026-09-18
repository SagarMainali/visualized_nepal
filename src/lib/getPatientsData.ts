import PatientsData from '@/data/hospitalData/patientsData.json';

export function getPatientsData() {
    return PatientsData as PatientsDataAllT[];
}