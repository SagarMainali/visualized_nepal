'use client'

import Barchart_Hospital_SingleCategory from './Barchart_Hospital_SingleCategory';
import Piechart from './Piechart_Hospital';
import Radarchart from './Radarchart_Hospital_SingleCategory';
import Barchart_Hospital_MultipleCategories from './Barchart_Hospital_MultipleCategories';
import Radarchart_Hospital from './Radarchart_Hospital_MultipleCategories';

type HospitalDataDisplayProps = {
    patientsData_All: PatientsDataAllT[]
}

export default function HospitalDataDisplay({ patientsData_All }: HospitalDataDisplayProps) {
    const getPatientsByCategory = (category: string): Patients_ByCategoryT[] => {
        // for counting categories and creating objects where order doesn't matter
        // example for counting patients according to condition: { diabetes: 24, cancer: 19 }
        const patientCount_byOtherCategory: Record<string, number> = {};

        // separate objects to preserve order of the properties
        const patientCount_byAge: PatientCount_byAgeT = {
            '0-15': 0,
            '15-30': 0,
            '30-45': 0,
            '45-60': 0,
            '60-75': 0,
            '75+': 0,
        }

        const patientCount_byLengthOfStay: PatientCount_byLengthOfStayT = {
            '0-3': 0,
            '3-7': 0,
            '7-14': 0,
            '14-30': 0,
            '30-45': 0,
            '45-60': 0,
            '60-75': 0,
            '75+': 0,
        }

        const patientCount_bySatisfaction: PatientCount_bySatisfactionT = {
            'Very Dissatisfied': 0,
            'Dissatisfied': 0,
            'Neutral': 0,
            'Satisfied': 0,
            'Very Satisfied': 0,
        }

        patientsData_All?.forEach(patientRecord => {
            // from the selected category by the user, get its value
            const selectedCategory = patientRecord[category as ('Condition' | 'Procedure' | 'Age' | 'Length of Stay' | 'Satisfaction')];

            if (category === 'Age') {
                const age = patientRecord['Age'];

                if (age < 15) patientCount_byAge['0-15']++;
                else if (age < 30) patientCount_byAge['15-30']++;
                else if (age < 45) patientCount_byAge['30-45']++;
                else if (age < 60) patientCount_byAge['45-60']++;
                else if (age < 75) patientCount_byAge['60-75']++;
                else patientCount_byAge['75+']++;
            }
            else if (category === 'Length of Stay') {
                const lengthOfStay = patientRecord['Length of Stay'];

                if (lengthOfStay < 3) patientCount_byLengthOfStay['0-3']++;
                else if (lengthOfStay < 7) patientCount_byLengthOfStay['3-7']++;
                else if (lengthOfStay < 14) patientCount_byLengthOfStay['7-14']++;
                else if (lengthOfStay < 30) patientCount_byLengthOfStay['14-30']++;
                else if (lengthOfStay < 45) patientCount_byLengthOfStay['30-45']++;
                else if (lengthOfStay < 60) patientCount_byLengthOfStay['45-60']++;
                else if (lengthOfStay < 75) patientCount_byLengthOfStay['60-75']++;
                else patientCount_byLengthOfStay['75+']++;
            }
            else if (category === 'Satisfaction') {
                const satisfaction = patientRecord['Satisfaction'];

                if (satisfaction === 1) patientCount_bySatisfaction['Very Dissatisfied']++;
                else if (satisfaction === 2) patientCount_bySatisfaction['Dissatisfied']++;
                else if (satisfaction === 3) patientCount_bySatisfaction['Neutral']++;
                else if (satisfaction === 4) patientCount_bySatisfaction['Satisfied']++;
                else patientCount_bySatisfaction['Very Satisfied']++;
            }
            else { //for all other categories where grouping isn't required and order doesn't matter
                // count the number of selected category which is also the number of patients for that particular category
                patientCount_byOtherCategory[selectedCategory] = (patientCount_byOtherCategory[selectedCategory] || 0) + 1;
            }
        })

        const patientCount_byCategory_formatted = Object.entries(
            category === 'Age'
                ? patientCount_byAge
                : category === 'Length of Stay'
                    ? patientCount_byLengthOfStay
                    : category === 'Satisfaction'
                        ? patientCount_bySatisfaction
                        : patientCount_byOtherCategory).map(
                            ([category, count]) => ({
                                category,
                                count
                            })
                        )

        return patientCount_byCategory_formatted;
    }

    return (
        <div className='h-auto w-full flex flex-col items-center pb-6'>
            {patientsData_All
                &&
                <>
                    <Barchart_Hospital_SingleCategory patientsData_All={patientsData_All} getPatientsByCategory={getPatientsByCategory} />

                    <Piechart patientsData_All={patientsData_All} getPatientsByCategory={getPatientsByCategory} />

                    <Radarchart patientsData_All={patientsData_All} getPatientsByCategory={getPatientsByCategory} />

                    <Barchart_Hospital_MultipleCategories patientsData_All={patientsData_All} getPatientsByCategory={getPatientsByCategory} />

                    <Radarchart_Hospital />
                </>
            }

            <div>
                <span className='text-[12px] text-gray-600'>
                    Source: <a href="https://www.kaggle.com/datasets/blueblushed/hospital-dataset-for-practice" target='_blank' rel="noreferrer noopener" className='underline underline-offset-2'>Kaggle</a>
                </span>
            </div>
        </div>
    )
}
