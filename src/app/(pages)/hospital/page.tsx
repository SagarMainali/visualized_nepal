import { getPatientsData } from "@/lib/getPatientsData";
import HospitalDataDisplay from "./HospitalDataDisplay";

export default function HospitalPage() {
    const patientsData = getPatientsData();

    return (
        <HospitalDataDisplay patientsData_All={patientsData} />
    )
}