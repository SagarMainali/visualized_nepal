import CustomDropDown from '@/components/CustomDropdown';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'
import { Legend, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from 'recharts';

export default function Radarchart_Hospital({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byCategory, setPatients_byCategory] = useState<Patients_ByCategoryT[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('Satisfaction');

    useEffect(() => {
        if (patientsData_All) {
            const data = getPatientsByCategory(selectedCategory);
            setPatients_byCategory(data);
        }
    }, [patientsData_All, selectedCategory])

    return (
        <div className='h-[93vh] w-full flex flex-col items-center py-4 gap-2'>
            {patients_byCategory
                ? (<>
                    <div className='w-[90%] flex flex-row-reverse gap-2'>
                        <CustomDropDown label='Categorize patients by' arrowIcon={true} items={['Condition', 'Age', 'Procedure', 'Length of Stay', 'Satisfaction']} onClickHandler={setSelectedCategory} selectedValue={selectedCategory} />
                    </div>

                    <ResponsiveContainer width="100%" height="85%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={patients_byCategory}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="category" />
                            <PolarRadiusAxis />
                            <Radar dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name='Patients numbers' />
                            {/* <Legend /> */}
                        </RadarChart>
                    </ResponsiveContainer>
                    <p className='chart-label'>Number of patients categorized by <strong>'{(selectedCategory[0].toUpperCase() + selectedCategory.slice(1))}'</strong></p>
                </>)
                : <Loader />
            }
        </div>
    )
}
