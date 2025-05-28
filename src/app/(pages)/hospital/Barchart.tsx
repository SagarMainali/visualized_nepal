import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Hospital from '@/components/customRecharts/customTooltip_Hospital';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'
import { Bar, CartesianGrid, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Barchart({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byCategory, setPatients_byCategory] = useState<Patients_ByCategoryT[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('Condition');

    useEffect(() => {
        if (patientsData_All) {
            const data = getPatientsByCategory(selectedCategory);
            setPatients_byCategory(data);
        }
    }, [patientsData_All, selectedCategory])

    return (
        <div className='h-screen w-full flex flex-col items-center'>
            {patients_byCategory
                ? (<>
                    <div className='w-[90%] flex flex-row-reverse gap-2'>
                        <CustomDropDown label='Categorize patients by' arrowIcon={true} items={['Condition', 'Age', 'Procedure', 'Length of Stay', 'Satisfaction', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setSelectedCategory} selectedValue={selectedCategory} />
                    </div>

                    <ResponsiveContainer width="90%" height="80%">
                        <BarChart data={patients_byCategory}>
                            <XAxis
                                dataKey="category"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={140}
                                tickFormatter={(value) =>
                                    value.length > 20 ? `${value.substring(0, 10)}...` : value
                                }
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip_Hospital selectedValue={selectedCategory} />} />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="count" fill="#4E6688" name="Number of patients" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-primary-gray text-[18px]'>Number of patients categorized by <strong>'{(selectedCategory[0].toUpperCase() + selectedCategory.slice(1))}'</strong></p>
                </>)
                : <Loader />
            }
        </div>
    )
}
