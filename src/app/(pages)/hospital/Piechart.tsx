import CustomDropDown from '@/components/CustomDropdown';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function Piechart({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byCategory, setPatients_byCategory] = useState<Patients_ByCategoryT[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('Condition');

    useEffect(() => {
        if (patientsData_All) {
            const data = getPatientsByCategory(selectedCategory);
            setPatients_byCategory(data);
        }
    }, [patientsData_All, selectedCategory])

    const COLORS = ['#FFAAAA', '#648DB3', '#7F55B1', '#537D5D', '#48A6A7', '#7F8CAA', '#948979', '#A4B465', '#A2B9A7', '#FF6363', '#67AE6E', '#9FB3DF', '#97866A', '#D4C9BE', '#27548A'];

    return (
        <div className='h-screen w-full flex flex-col items-center'>
            {patients_byCategory
                ? (<>
                    <div className='w-[90%] flex flex-row-reverse gap-2'>
                        <CustomDropDown label='Categorize patients by' arrowIcon={true} items={['Condition', 'Age', 'Procedure', 'Length of Stay', 'Satisfaction', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setSelectedCategory} selectedValue={selectedCategory} />
                    </div>

                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip />
                            <Pie data={patients_byCategory} dataKey="count" nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={200}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} >
                                {(patients_byCategory && patients_byCategory.length > 0) && (
                                    patients_byCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))
                                )}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <p className='text-primary-gray text-[18px]'>Number of patients categorized by <strong>'{(selectedCategory[0].toUpperCase() + selectedCategory.slice(1))}'</strong></p>
                </>)
                : <Loader />
            }
        </div>
    )
}
