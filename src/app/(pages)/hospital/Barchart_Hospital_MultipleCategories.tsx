import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Hospital_MultipleCategories from '@/components/customRecharts/customTooltip_Hospital_MultipleCategories';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react'
import { Bar, CartesianGrid, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList, Label, Legend } from 'recharts';

export default function Barchart_Hospital_MultipleCategories({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byMultipleCategories, setPatients_byMultipleCategories] = useState<Patients_ByMultipleCategoriesT[] | null>(null);

    const [firstCategory, setFirstCategory] = useState<keyof PatientsDataAllT>('Condition');
    const [secondCategory, setSecondCategory] = useState<keyof PatientsDataAllT>('Satisfaction');

    const getPatientsByMultipleCategories = () => {

        const firstCategoryData_Arr = getPatientsByCategory(firstCategory);

        // const categories_Arr: string[] = [];

        //  extract categories(conditions or procedures) from the patient record
        // patientsData_All.forEach(patientRecord => {
        //     const category = patientRecord[firstCategory] as string;

        //     if (!categories_Arr.includes(category)) {
        //         categories_Arr.push(category)
        //     }
        // })

        // type SatisfactionLabel = 'Very Dissatisfied' | 'Dissatisfied' | 'Neutral' | 'Satisfied' | 'Very Satisfied';
        // type CategorySatisfactionCount = Record<SatisfactionLabel, number>;

        const patients_byMultipleCategories: Record<string, any> = {};

        // console.log('fcd_arr:', firstCategoryData_Arr)

        const categoryCounts: number[] = [];

        firstCategoryData_Arr.forEach(fcd => {
            const { category, count } = fcd;
            categoryCounts.push(count);

            patientsData_All.forEach(patientRecord => {
                if (category !== patientRecord[firstCategory]) return;

                const sc = patientRecord[secondCategory];

                if (!patients_byMultipleCategories[category]) {
                    patients_byMultipleCategories[category] = {
                        'Very Dissatisfied': 0,
                        'Dissatisfied': 0,
                        'Neutral': 0,
                        'Satisfied': 0,
                        'Very Satisfied': 0,
                    };
                }

                if (sc === 1) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Very Dissatisfied': (patients_byMultipleCategories[category]['Very Dissatisfied'] || 0) + 1
                    }
                } else if (sc === 2) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Dissatisfied': (patients_byMultipleCategories[category]['Dissatisfied'] || 0) + 1
                    }
                } else if (sc === 3) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Neutral': (patients_byMultipleCategories[category]['Neutral'] || 0) + 1
                    }
                } else if (sc === 4) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Satisfied': (patients_byMultipleCategories[category]['Satisfied'] || 0) + 1
                    }
                } else {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Very Satisfied': (patients_byMultipleCategories[category]['Very Satisfied'] || 0) + 1
                    }
                }
            })
        })

        const patientCount_byMultipleCategories_formatted = Object.entries(patients_byMultipleCategories).map(
            ([category, satisfaction], index) => ({
                category,
                count: categoryCounts[index],
                satisfaction
            })
        )

        // console.log('formatted', patientCount_byMultipleCategories_formatted);

        setPatients_byMultipleCategories(patientCount_byMultipleCategories_formatted);
    }

    useEffect(() => {
        if (patientsData_All) {
            getPatientsByMultipleCategories();
        }
    }, [patientsData_All])

    const longLabelCategories = ['Condition', 'Procedure'];
    const isSelectedCategoryLabelLong = longLabelCategories.includes(firstCategory);

    return (
        <div className='h-[93vh] w-full flex flex-col items-center py-4 gap-2'>
            {patients_byMultipleCategories
                ? (<>
                    <div className='w-[90%] flex gap-2 items-center'>
                        <CustomDropDown label={firstCategory} arrowIcon={true} items={['Condition', 'Age', 'Procedure', 'Length of Stay', 'Satisfaction', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setFirstCategory} selectedValue={firstCategory} />
                        <span className='font-semibold'>vs</span>
                        <CustomDropDown label={secondCategory} arrowIcon={true} items={['Condition', 'Age', 'Procedure', 'Length of Stay', 'Satisfaction', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setSecondCategory} selectedValue={secondCategory} />
                        <button className='bg-primary-blue px-6 py-2 ml-auto text-white rounded-lg cursor-pointer font-semibold' onClick={getPatientsByMultipleCategories}>Compare</button>
                    </div>

                    <ResponsiveContainer width="90%" height="85%">
                        <BarChart data={patients_byMultipleCategories} margin={{ top: 20, left: 10 }}>
                            <XAxis
                                dataKey="category"
                                angle={isSelectedCategoryLabelLong ? -45 : 0}
                                textAnchor={isSelectedCategoryLabelLong ? 'end' : 'middle'}
                                interval={0}
                                height={isSelectedCategoryLabelLong ? 160 : 50}
                                tickFormatter={(value) =>
                                    value.length > 20 ? `${value.substring(0, 10)}...` : value
                                }
                                tickMargin={isSelectedCategoryLabelLong ? 5 : 10}
                            >
                                <Label value={firstCategory} position="insideBottom" height={100} />
                            </XAxis>

                            <YAxis label={{ value: 'No. of patients', angle: -90, position: 'insideLeft' }} />

                            <Tooltip content={<CustomTooltip_Hospital_MultipleCategories selectedValue={`${firstCategory} vs ${secondCategory}`} />} />

                            <Legend />

                            <CartesianGrid stroke="#f5f5f5" />

                            <Bar dataKey="satisfaction.Very Dissatisfied" fill="#FF0B55" stackId='a1' name='Very Dissatisfied' />
                            <Bar dataKey="satisfaction.Dissatisfied" fill="#F97A00" stackId='a1' name='Dissatisfied' />
                            <Bar dataKey="satisfaction.Neutral" fill="#7886C7" stackId='a1' name='Neutral' />
                            <Bar dataKey="satisfaction.Satisfied" fill="#A0C878" stackId='a1' name='Satisfied' />
                            <Bar dataKey="satisfaction.Very Satisfied" fill="#497D74" stackId='a1' name='Very Satisfied' >
                                <LabelList dataKey="count" position="top" offset={10} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className='chart-label'>Number of patients categorized by <strong>'{firstCategory}' vs '{secondCategory}'</strong></p>
                </>)
                :
                <Loader />
            }
        </div >
    )
}
