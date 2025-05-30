import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Hospital from '@/components/customRecharts/customTooltip_Hospital';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'
import { Bar, CartesianGrid, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from 'recharts';

export default function Barchart_Hospital({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byCategory, setPatients_byCategory] = useState<Patients_ByCategoryT[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('Condition');

    useEffect(() => {
        if (patientsData_All) {
            const data = getPatientsByCategory(selectedCategory);
            setPatients_byCategory(data);
        }
    }, [patientsData_All, selectedCategory])

    const longLabelCategories = ['Condition', 'Procedure'];
    const isSelectedCategoryLabelLong = longLabelCategories.includes(selectedCategory);

    return (
        <div className='h-[93vh] w-full flex flex-col items-center py-4 gap-2'>
            {patients_byCategory
                ? (<>
                    <div className='w-[90%] flex flex-row-reverse'>
                        <CustomDropDown label='Categorize patients by' arrowIcon={true} items={['Condition', 'Age', 'Procedure', 'Length of Stay', 'Satisfaction', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setSelectedCategory} selectedValue={selectedCategory} />
                    </div>

                    <ResponsiveContainer width="90%" height="85%">
                        <BarChart data={patients_byCategory} margin={{ top: 20 }}>
                            <XAxis
                                dataKey="category"
                                angle={isSelectedCategoryLabelLong ? -45 : 0}
                                textAnchor={isSelectedCategoryLabelLong ? 'end' : 'middle'}
                                interval={0}
                                height={isSelectedCategoryLabelLong ? 120 : 50}
                                tickFormatter={(value) =>
                                    value.length > 20 ? `${value.substring(0, 10)}...` : value
                                }
                                tickMargin={isSelectedCategoryLabelLong ? 5 : 10}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip_Hospital selectedValue={selectedCategory} />} />
                            {/* <Legend verticalAlign='top'/> */}
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="count" fill="#4E6688" name="Number of patients" >
                                <LabelList dataKey="count" position="top" offset={10} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className='chart-label'>Number of patients categorized by <strong>'{(selectedCategory[0].toUpperCase() + selectedCategory.slice(1))}'</strong></p>
                </>)
                : <Loader />
            }
        </div>
    )
}
