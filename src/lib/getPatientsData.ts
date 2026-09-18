import PatientsData from '@/data/HospitalData/patientsData.json';

export function getPatientsData() {
    return PatientsData as PatientsDataAllT[];
}